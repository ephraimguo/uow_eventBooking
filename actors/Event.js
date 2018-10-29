/*
*
*
*Title	Department	Coordinator	Contact number	Contact Email	Company	Type	Date	Start time	End Time	Dress Code	Venue	Room	Cost	Capacity	Deadline	Eligibility	Poster
*
*
*
* */

const moment = require('moment');
const {Actor} = require('cqrs');
const evtVal = require('../validators/evtVal');
const {hasError} = require('../validators/hasError');


module.exports = class Event extends Actor {
  static get uniqueFields(){
    return ['startTimeVenueRoomId'];
  }

  static async beforeCreate(data, domain, uniqueOk, holdedFields){
    let errors = {}

    const evtUnv = await domain.get('UniqueValidator', 'Event');
    const startTimeVenueRoomId = moment(data.startTimeRaw).format('X') + data.venue + data.roomId;
    // let isUnique = false;

    try{
      await evtUnv.hold('startTimeVenueRoomId', startTimeVenueRoomId);
    }
    catch(err){
      console.log('\n\n ======== Event <|-- err ====== \n', err, '----------------------');
      errors = evtVal.dupVal(err.holded);
    }

    console.log('\n\n =========== Event <|-- beforeCreate errors ========= \n', errors, '\n ------------------');

    if(hasError(errors)){
      throw errors;
    }
  }

  constructor(data){
    const {
      title,
      department,
      coordinator,
      contactNo,
      contactEmail,
      company,
      type,
      startTimeRaw,
      duration,
      dressCode,
      venue,
      roomId,
      capacity,
      eventPrice,
      poster,
      adminActorId
    } = data;
    super({
      title,
      department,
      coordinator,
      contactNo,
      contactEmail,
      company,
      type,
      startTimeRaw,
      startTime: moment(startTimeRaw).format('X'),
      duration,
      dressCode,
      venue,
      roomId,
      capacity,
      seatTaken:0,
      eventPrice,
      poster,
      createdBy: adminActorId,
      createdAt: moment().format('X'),
      lastEditedBy: adminActorId,
      lastEditedAt: moment().format('X')
    });
  }

  async updateInfo(eventData, adminActorId){

    const evtUnv = await this.$.get('UniqueValidator', 'Event');
    const startTimeVenueRoomId = moment(eventData.startTimeRaw).format('X') + eventData.venue + eventData.roomId;

    let isUnique = false;
    let errors = {}

    try{
      isUnique = await evtUnv.hold('startTimeVenueRoomId', startTimeVenueRoomId);
    }
    catch(err) {
      errors = evtVal.dupVal(err.holded);
    }

    console.log('\n\n ====== Event <|-- updateInfo ===== \n', errors, '\n ---------------');
    if(!isUnique || hasError(errors)){
      throw errors;
    }
    else{
      this.$({eventData, adminActorId});
    }
  }

  updateSeats(quantity, adminActorId){
    this.$({quantity, adminActorId});
  }


  get updater() {
    return {
      updateInfo(json, event){
        const {
          title,
          department,
          coordinator,
          contactNo,
          contaceEmail,
          company,
          type,
          startTimeRaw,
          duration,
          dressCode,
          venue,
          roomId,
          capacity,
          eventPrice,
          poster,
          adminActorId
        } = event.data;
        return {
          title,
          department,
          coordinator,
          contactNo,
          contaceEmail,
          company,
          type,
          startTimeRaw,
          startTime: moment(startTimeRaw).format('X'),
          duration,
          dressCode,
          venue,
          roomId,
          capacity,
          eventPrice,
          poster,
          lastEditedBy: adminActorId,
          lastEditedAt: moment().format('X')
        }
      },
      updateSeats(json, event){
        return {
          seatTaken: json.seatTaken + event.data.quantity,
          lastEditedAt: moment().format('X'),
          lastEditedBy: event.data.adapter
        }
      }
    }
  }
}