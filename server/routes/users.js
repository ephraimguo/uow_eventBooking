const Router = require('express').Router;
const router = Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.dbs.User.find({},function (err,users) {
    res.send(users);
  })
});

/* GET user by ID. */
router.get('/:id', function (req, res, next) {
  req.dbs.User.findOne({id:req.params.id},function (err,user) {
    res.send(user);
  })
});

router.post('/updateUserInfo', async function(req, res) {
  console.log('\n\n ======== /users/updateUserInfo/ ======= \n',
    req.body, '\n --------------------------');

  const userInfo = req.body;

  const userActorId = req.session.authUser.id;
  const userActor = await req.$domain.get('User', userActorId);
  try {
    await userActor.updateInfo(userInfo, userActorId);
    console.log('\n\n ======== /users/updateUserInfo/ ======== \n',
      userActor.data, '\n -------------------');
    req.session.authUser = userActor.data;
    res.send({data:userActor.data});
  }
  catch(err) {
    res.send({err});
  }
});



router.post('/login', async function(req, res){
  console.log('\n\n ====== /users/login <|-- req.body ====== \n',
    req.body, '\n -------------------');

  const {username, password} = req.body;
  let errors = {}


  req.dbs.User.findOne({username: username, password:password}, function(err, user){
    if(!!err){
      res.send('/users/login <|-- ERROR!');
    }
    else if(!user){
      errors = {loginInfo:'Username or Password wrong'}
      res.send(errors);
    }
    else{
      req.session.authUser = user;

      console.log('\n\n ======  /users/login <|-- logged in ====== \n',
        req.session.authUser, '\n ----------------');
      res.send(user);
    }
  });
});

router.post('/logout', async function(req, res){
  delete req.session.authUser;
  res.json({
    loggedOut: 'Logout Successful'
  })
});



module.exports = router;
