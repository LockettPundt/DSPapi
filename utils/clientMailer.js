const nodemailer = require('nodemailer');
const emailGenerator = require('./emailGenerator');
require('dotenv').config();

async function nodeMailer(order) {
  const template = emailGenerator(order);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PW,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Daniel Stabler Photography" <dspdonotreply@gmail.com>', // sender address
    to: `${order.email}`, // list of receivers
    subject: `Thank You ${order.firstName}`, // Subject line
    text: `Thank You ${order.firstName}`, // plain text body
    html: template, // html body
  });

  console.log('Message sent: %s', info.messageId);

  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer;
