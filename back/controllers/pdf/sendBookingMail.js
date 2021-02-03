'use strict';

const { SENDGRID_API_KEY } = process.env;
const sgMail = require('@sendgrid/mail');

async function sendBookingMail(file, req, next) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: req.auth.email,
      from: 'flanders.bender@gmail.com',
      subject: 'Nueva Reserva en FLanders',
      text: `Saludos ${req.auth.username}:
      Te enviamos una copia de la reserva que acabas de hacer.
      Disfruta del viaje.`,
      html: `<H1>Saludos ${req.auth.username}:</H1>
      <p>Te enviamos una copia de la reserva que acabas de hacer. Disfruta del viaje.</p>`,
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
module.exports = { sendBookingMail };
