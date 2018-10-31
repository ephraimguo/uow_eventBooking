const Router = require('express').Router;
const router = Router();
const moment = require('moment');

router.post('/queryByDate', async function(req, res){
  const {currentDateRaw} = req.body;
  console.log('\n\n ==== /events/queryByDate ==== \n',
    currentDateRaw, '\n ---------------------');

  const lowerBound = moment(currentDateRaw).format('X');
  const upperBound = moment(currentDateRaw).add(1,'d').format('X');

  req.dbs.Event.find({startTime:{$gt:lowerBound, $lt:upperBound}}, function(err, events){
    if(!!err){
      res.send('/event/queryByDate <|-- !!Err');
    }
    else if(!events){
      res.send('/event/queryByDate <|-- No Events Found');
    }
    else {
      res.send(events);
    }
  });

  // res.send('query by date router thru');
});

module.exports = router;