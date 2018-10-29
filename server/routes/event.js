const Router = require('express').Router;
const router = Router();

router.post('/queryByDate', async function(req, res){
  console.log('\n\n ==== /events/queryByDate ==== \n', req.body, '\n ---------------------');
  res.send('query by date router thru');
});

module.exports = router;