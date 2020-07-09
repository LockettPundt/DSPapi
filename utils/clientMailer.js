const nodemailer = require('nodemailer');
require('dotenv').config();
const moment = require('moment');

async function nodeMailer(order) {
  console.log(order.jobDate);
  const time = `${moment(order.jobDate).format('LL')} at ${order.time}`;
  const template = `
    <div>
      <h3>Confirmation Number: ${order._id}</h3>
      <h4>When: ${time}</h4>
    </div>
  `;

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
    from: '"DSP 👻" <dspdonotreply@gmail.com>', // sender address
    to: 'kalifornium@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: template, // html body
  });

  console.log('Message sent: %s', info.messageId);

  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer;
