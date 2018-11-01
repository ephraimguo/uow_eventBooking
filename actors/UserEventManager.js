/*
* managerId
* userActorId
* bookedEvents -> array
*
*
* */

const {Actor} = require('cqrs');
const {hasError} = require('../validators/hasError');
const moment = require('moment');

module.exports = class UserEventManager extends Actor {

  constructor(data){
    const {userActorId, adminActorId} = data;
    super({
      id:'evtmanager' + data.userActorId,
      userActorId,
      bookedEvents: [],
      lastEditedBy: adminActorId,
      lastEditedAt: moment(Date.now()).format('X')
    });
  }

  bookEvent(eventId, adminActorId) {
    let errors = {}
    if(this.data.bookedEvents.includes(eventId)){
      throw {dupBooking: "You have already booked this event :))"}
    }
    else {
      this.$({eventId, adminActorId})
    }
  }

  unBookEvent(eventId, adminActorId) {
    if(this.data.bookedEvents.includes(eventId)){
      this.$({eventId, adminActorId});
    }
    else {
      throw {error: "event not found, something worng, please email the organiser"}
    }
  }

  get updater() {
    return {
      bookEvent(data, event) {
        const bookedEvents = data.bookedEvents;
        bookedEvents.push(event.data.eventId);
        return {
          bookedEvents,
          lastEditedBy: event.data.adminActorId,
          lastEditedAt: moment(Date.now()).format('X')
        }
      },
      unBookEvent(data, event) {
        const tempBookedEvents = new Set(data.bookedEvents);
        const {eventId, adminActorId} = event.data;
        tempBookedEvents.delete(eventId);
        return {
          bookedEvents: [...tempBookedEvents],
          lastEditedBy: adminActorId,
          lastEditedAt: moment(Date.now()).format('X')
        }
      }
    }
  }
}