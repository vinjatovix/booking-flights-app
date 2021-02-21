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
      Te enviamos una copia como comprobante de la reserva recientemente realizada. Por favor comprueba los datos y en caso de error no dudes en ponerte en contacto con nosotros via email: flanders.bender@gmail.com. Gracias por confiar en Flight Landers. Disfruta del viaje.
      
      
      DISCLAIMER:
      Aunque los datos de los vuelos son reales, esta aplicación es una simple demos
      adquiridos por Mateo Codesido y Pablo Viña durante el bootcamp JSB07CO de Hack A Boss en 2020/2021.
      Esta reserva no tiene valor real. Ni nos hacemos responsables del uso indebido de la aplicación.`,
      html: `<H1>Saludos ${req.auth.username}:</H1>
      <p>Te enviamos una copia de la reserva que acabas de hacer. Disfruta del viaje.</p>

      <h1>DISCLAIMER:</h1>
<p>Aunque los datos de los vuelos son reales, esta aplicación es una simple demostración de los conocimientos adquiridos por Mateo Codesido y Pablo Viña durante el bootcamp JSB07CO de Hack A Boss en 2020/2021.</p>
<p>Esta reserva no tiene valor real. Ni nos hacemos responsables del uso indebido de la aplicación.</p>`,
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
