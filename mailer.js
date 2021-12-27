const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  // find your service at https://nodemailer.com/smtp/well-known/
  service: '<service>',
  auth: {
    user: '<sender_email_address>',
    pass: '<password>'
  }
}));

module.exports = {
  sendMail: (text) => {
    const mailOptions = {
      from: '<sender_email_address>',
      to: '<email_address>',
      subject: 'Found Available Appointment(s)',
      text: text
    };

    console.log("trying to send mail")
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Error: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }
} 