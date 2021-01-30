'use strict';

const path = require('path');
const puppeteer = require('puppeteer');

async function storePdf(pdfData, req, next) {
  try {
    const browser = await puppeteer.launch();
    const page = browser.newPage();

    const ida = pdfData.travel.direction[0];

    let trayectoVuelta = setVuelta(pdfData);

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YourBooking</title>
        <style>
          body {
            text-align:center;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
              sans-serif;
              display:grid;
              justify-content:center;
              align-items:center;
          }

        </style>
      </head>
      <body>
        <header>
          <h3>Booking Number: ${pdfData.bookingNumber}</h3>
          <p>Ordered by: ${pdfData.user.email}</p>
          <p>Adults: ${pdfData.adults}</p>
          <p>Total Ammount: ${pdfData.priceTotal} €</p>
        </header>
    
        <section>
          <h4>Trayecto</h4>
          <ul>
            <li>Origen: ${ida.origin}</li>
            <li>Destino:${ida.destination}</li>
            <li>Salida: ${ida.departure}</li>
            <li>Llegada:${ida.arrival}</li>
            <li>Paradas:${ida.stops}</li>
            <li>Duración:${ida.duration}</li>
          </ul>
          ${trayectoVuelta}
        </section>
        <footer>
          <p>Thanks for using Flight Landers</p>
        </footer>
      </body>
    </html>`;
    await (await page).setContent(html); //TODO: WTF???
    const filePath = path.join(__dirname, `../../tmp/${req.auth.id}-${Date.now()}.pdf`);
    await (await page).pdf({
      path: filePath,
    });
    await browser.close();
    return filePath;
  } catch (err) {
    err.details = err.message;
    next(err);
  }
}
module.exports = { storePdf };
function setVuelta(pdfData) {
  let trayectoVuelta = '';
  if (pdfData.travel.direction[1]) {
    const vuelta = pdfData.travel.direction[1];
    trayectoVuelta = `<h4>Trayecto Vuelta</h4>
      <ul>
        <li>Origen: ${vuelta.origin}</li>
        <li>Destino:${vuelta.destination}</li>
        <li>Salida: ${vuelta.departure}</li>
        <li>Llegada:${vuelta.arrival}</li>
        <li>Paradas:${vuelta.stops}</li>
        <li>Duración:${vuelta.duration}</li>
      </ul>`;
  }
  return trayectoVuelta;
}
