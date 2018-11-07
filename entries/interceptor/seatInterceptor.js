
module.exports = {
  booking(req, res, next) {
    console.log('booking interceptor');
    next();
  },
  unBooking(req, res, next) {
    console.log('unbooking interceptor');
    next();
  }
}