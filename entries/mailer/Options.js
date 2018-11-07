module.exports = {

  option_1(receiver, title, content) {
    let option = {
      from: '"Uow Event Booking System" <uoweventbooking@gmail.com>',
      to: receiver,
      subject: title,
      html: content
    }
    return option;
  }

}