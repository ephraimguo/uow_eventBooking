const {sendEmail} = require('../entries/mailer/mailerConfig');
const moment = require('moment');

module.exports = function({domain}) {
  domain.on({actorType:'UserEventManager', type: 'unBookEvent'}, async function(event){
    const eventId = event.data.eventId;
    const adminActorId = event.data.adminActorId;
    const eventActor = await domain.get('Event', eventId);

    const adminActor = await domain.get('User', adminActorId);

    sendEmail(adminActor.data.perEmail, 'Cancel Booking Notification',
      `
      <h3>${eventActor.data.title}</h3>
      <p>Time: ${moment(eventActor.data.startTimeRaw).format('DD-MM-YYYY HH:mm')}</p>
      <p>Address: ${eventActor.data.venue}: ${eventActor.data.roomId}</p>
      `
    );

    try{
      await eventActor.updateSeats(-1, adminActorId);
      console.log('\n\n ======= Listener <|-- onUnBookEvent ====== \n');
    }
    catch(err) {
      throw {err}
    }
  });
}