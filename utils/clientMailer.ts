import nodemailer from 'nodemailer'
import emailGenerator from './emailGenerator'
import { EMAIL, EMAIL_PW } from '../config'
import { Order } from '../schema/Order-type'

export default async function nodeMailer(order: Order) {
  const template = emailGenerator(order);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Daniel Stabler Photography" <dspdonotreply@gmail.com>',
    to: `${order.email}`, // list of receivers
    subject: `Thank You ${order.firstName}`, // Subject line
    text: `Thank You ${order.firstName}`, // plain text body
    html: template, // html body
  });

  console.log('Message sent: %s', info.messageId);
}


