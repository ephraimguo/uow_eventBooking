/*
* managerId
* userActorId
* bookedEvents -> array
*
*
* */

const {Actor} = require('cqrs');

module.exports = class UserEventManager extends Actor {

  constructor(data){
    const {userActorId} = data;
    const managerId = 'evtmanager' + data.userActorId;
    super({
      managerId,
      userActorId
    });
  }


}