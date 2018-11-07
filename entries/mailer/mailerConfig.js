const nodemailer = require('nodemailer');
// const

const mailOp = require('./Options').option_1;
const hostOp = {
  user: 'uoweventbooking@gmail.com',
  pass: 'civcykpjlzdoqjbm'
}

let transporter = nodemailer.createTransport({
  //service: 'gmail',//'hotmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: hostOp.user,
    pass: hostOp.pass
  }
});

module.exports = {
  sendEmail(receiver, title, content) {
    transporter.sendMail(mailOp(receiver, title, content), function(err, info) {
      if(err){
        console.log(err);
      }
      else {
        console.log(info);
      }
    });
  }
}