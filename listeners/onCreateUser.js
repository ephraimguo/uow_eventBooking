

module.exports = function({domain}) {
  domain.once({actorType: 'User', type:'create'}, async function(event){
    const userInfo = event.data;
    const userActorId = userInfo.id;
    const adminActorId = userInfo.adminActorId;

    const userEventManger = await domain.create('UserEventManager', {userActorId, adminActorId});

    console.log('\n\n ======== On Create User Listener ======= \n',
      userEventManger, '\n -------------------');
  });
}