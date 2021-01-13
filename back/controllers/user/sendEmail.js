'use strict';

const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');

async function sendEmail(mail, next) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: mail.email,
      from: 'flanders.bender@gmail.com',
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    };

    await sgMail.send(msg);
  } catch (err) {
    err.status = 400;
    next(err);
  }
}

module.exports = { sendEmail };
