'use strict'
require('dotenv').config();
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"From" <${event.email}>`, // sender address
    to: `${process.env.USER}, ${process.env.CLIENT_EMAIL}`, // list of receivers
    subject: event.subject, // Subject line
    text: event.message, // plain text body
    html: `<b>${event.message}</b>`, // html body
  });

  return "Message sent: %s", info.messageId;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

