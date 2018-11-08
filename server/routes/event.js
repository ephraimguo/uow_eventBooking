const Router = require('express').Router;
const router = Router();
const moment = require('moment');


router.post('/queryAll', async function(req, res) {
  req.dbs.Event.find({}, function(err, events) {
    res.status(200).send(events);
  });
});

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

router.post('/queryByCreatedBy', async function(req, res) {
  const {createdBy} = req.body;
  req.dbs.Event.find({createdBy: {$in: [createdBy]}}, function(err, event){
    if(!!err){
      res.send(' /event/queryByCreatedBy ');
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

});

router.post('/updateEventRevenue', async function(req, res){
  const {eventId, hasPromocode} = req.body;
  console.log('\n\n ====== /event/updateEventRevenue ====== \n',
    eventId, hasPromocode, '\n ------------------');

  const event = await req.$domain.get('Event', eventId);

  const price = event.data.eventPrice;

  await event.updateRevenue(price, hasPromocode);

  res.send({eventId, hasPromocode});
});

router.post('/removeEvent', async function(req, res) {

  const {event} = req.body;
  const eventId = event.id;

  const adminActorId = req.session.authUser.id;

  const eventActor = await req.$domain.get('Event', eventId);
  const eventUv = await req.$domain.get('UniqueValidator', 'Event');

  let managerList = [];

  console.log('x1');

  req.dbs.UserEventManager.find({bookedEvents:{$all: [eventId]}}, async function(err, managers) {
    if(!!err) {
      // res.send('/event/removeEvent/ <|-- ERR', err);
      res.status(200).send(err);
    }
    else if(!managers) {
      // managerList = ['/event/removeEvent/ <|-- no manager found'];
      res.status(200).send('/event/removeEvent/ <|-- no manager found');
    }
    else {

      console.log('x2', managers);

      // managerList = managers;

      if(!!managers.length){

        for(let man of managers) {
          const manActor = await req.$domain.get('UserEventManager', man.id);
          await manActor.unBookEvent(eventId, adminActorId);
        }

        // await eventUv.giveup('startTimeVenueRoomId',moment(eventActor.data.startTimeRaw).format('X') + eventActor.data.venue + eventActor.data.roomId);
        // await eventActor.remove({managers});

        console.log('x3');
      }
      // else {
      console.log('x3.5');

      await eventUv.giveup('startTimeVenueRoomId',moment(eventActor.data.startTimeRaw).format('X') + eventActor.data.venue + eventActor.data.roomId);
      await eventActor.remove();
      console.log('x4');
      res.send(managers);
      // }

      // console.log('x0', managers);
      // managerList = managers;
    }
  });

});

module.exports = router;