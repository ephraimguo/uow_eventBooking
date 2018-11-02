const Router = require('express').Router;
const router = Router();
const moment = require('moment');

router.post('/queryByDate', async function(req, res){
  const {currentDateRaw} = req.body;
  // const tempDate = new Date(currentDateRaw);
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

router.post('/queryByEventId', async function(req, res) {
  const {eventId} = req.body;
  req.dbs.Event.findOne({id: eventId}, function(err, event){
    if(!!err){
      res.send(' /event/queryByEventId ');
    }
    else if(!event) {
      res.send('No event found');
    }
    else {
      res.send(event);
    }
  });
});

router.post('/updateEventInfo', async function(req, res){
  const {editingEventInfo, eventId} = req.body;
  console.log('\n\n ======== /event/updateEventInfo/ ========\n editingEventInfo',
    editingEventInfo, '\n eventId' ,
    eventId, '\n ---------------------');

  const adminActorId = req.session.authUser.id;
  const event = await req.$domain.get('Event', eventId);
  try {
    await event.updateInfo(editingEventInfo, adminActorId);
    res.send({data: event.data});
  }
  catch(err) {
    res.send({err});
  }

  // res.send('update Event info successful');

});

module.exports = router;