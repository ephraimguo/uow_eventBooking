

module.exports = function({domain}) {
  domain.on({actorType:'UserEventManager', type: 'bookEvent'}, async function(event){
    const eventId = event.data.eventId;
    const adminActorId = event.data.adminActorId;
    const eventActor = await domain.get('Event', eventId);

    try{
      await eventActor.updateSeats(1, adminActorId);
    }
    catch(err) {
      throw {err}
    }
  });
}