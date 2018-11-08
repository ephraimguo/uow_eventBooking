

module.exports = function({domain}) {
  domain.on({actorType: 'Event', type:'remove'}, async function(event){
    console.log('\n\n ======= On Remove Event Listener ======= \n',
      event, '\n -----------------------');
  });
}