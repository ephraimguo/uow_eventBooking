const Router = require('express').Router;
const router = Router();

router.post('/queryById', async function(req, res) {
  console.log('\n\n ========= /userEeventManager/queryById/ ======== \n',
    req.body, '\n ----------------------');
  const {managerId} = req.body;
  const userEventManager = (await req.$domain.get('UserEventManager', managerId)).data;
  console.log('\n\n ========= /userEeventManager/queryById/ Manager======== \n',
    userEventManager, '\n ----------------------');
  res.send({userEventManager});
});

router.post('/bookEvent', async function(req, res) {
  const {eventId, userActorId ,adminActorId} = req.body;
  console.log('\n\n ====== userEventManager/bookEvent/ ======\n',
    req.body, '\n ---------------------');

  const userEventManager = await req.$domain.get('UserEventManager', 'evtmanager'+userActorId);
  console.log('\n\n ======== /userEventManager/bookEvent =======\n',
    userEventManager.data, '\n ------------------------');
  try {
    console.log('\n\n ======== /userEventManager/bookEvent =======\n',
      userEventManager.data, '\n ------------------------');
    await userEventManager.bookEvent(eventId, adminActorId);
    res.send({eventId, userEventManager: userEventManager.data});
  }
  catch(err) {
    res.send({err});
  }
});

module.exports = router;