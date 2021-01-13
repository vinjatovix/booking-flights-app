'use strict';

const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');

async function sendBookingMail(file, req, next) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: req.auth.email,
      from: 'flanders.bender@gmail.com',
      subject: 'New Flanders Booking',
      text: `Greetings ${req.auth.username}:
      Here you got a copy for the booking you've just made.
      Enjoy your travel.`,
      html: `<H1>Greetings ${req.auth.username}:</H1>
      <p>Here you got a copy for the booking you've just made. Enjoy your travel.</p>`,
      attachments: [
        {
          content: file,
          filename: 'Booking.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(msg);
  } catch (err) {
    err.status = 400;
    next(err);
  }
}
exports.sendBookingMail = sendBookingMail;
