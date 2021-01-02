'use strict';

// NODEMAILER
// const nodemailer = require('nodemailer');
// const { EMAIL_USER, EMAIL_PASS } = process.env;

// async function sendEmail() {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: 'flanders.bender@gmail.com',
//       to: 'mateo_2992@hotmail.com',
//       subject: 'Sending Email using Node.js',
//       text: `I'm an email`,
//     });

//     console.log('Message sent: %s', info.messageId);
//   } catch (err) {
//     err.code = 400;
//     console.log(err);
//   }
// }

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

async function sendEmail() {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: 'luciamsobrido@gmail.com',
      from: 'flanders.bender@gmail.com',
      subject: 'Email automático',
      text: 'Hola, soy un email y he sido enviado a través de un servidor Node.js',
      html: '<strong> esto es una prueba solo, no se alarmen</strong>',
    };

    await sgMail.send(msg);
  } catch (err) {
    err.status = 400;
    console.log(err);
  }
}

module.exports = { sendEmail };
