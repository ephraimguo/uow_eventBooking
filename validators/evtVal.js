

module.exports = {
  seatVal() {

  },
  dupVal(holdedFields){
    let errors = {}
    if(holdedFields.includes('startTimeVenueRoomId')){
      errors = {dupTimeAndVenue: 'TIME AND VENUE CONFLICT WITH OTHER EVENT, PLEASE CHANGE TIME'}
    }
    return errors;
  }
}