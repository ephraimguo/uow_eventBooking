const {sendEmail} = require('../entries/mailer/mailerConfig');
const moment = require('moment');

module.exports = function({domain}) {
  domain.on({actorType:'UserEventManager', type: 'bookEvent'}, async function(event){
    const eventId = event.data.eventId;
    const adminActorId = event.data.adminActorId;
    const eventActor = await domain.get('Event', eventId);

    const adminActor = await domain.get('User', adminActorId);

    sendEmail(adminActor.data.perEmail, 'Event Booked Successfully',
      `
      <h3>${eventActor.data.title}</h3>
      <p>Time: ${moment(eventActor.data.startTime).format('DD-MM-YYYY HH:mm')}</p>
      <p>Registered Count: ${eventActor.data.seatTaken}</p>
      `
    );

    try{
      await eventActor.updateSeats(1, adminActorId);
    }
    catch(err) {
      throw {err}
    }
  });
}