'use strict';

const path = require('path');
const puppeteer = require('puppeteer');

async function storePdf(pdfData, req, next) {
  try {
    const browser = await puppeteer.launch();
    const page = browser.newPage();

    const header = setHeader(pdfData);
    const ida = setDirection(pdfData, 'ida');
    const vuelta = setDirection(pdfData, 'vuelta');

    const html = fillTemplate(header, ida, vuelta);
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
function fillTemplate(header, ida, vuelta = '') {
  return `
    <!DOCTYPE html>
      <html lang="es">

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Tu reserva</title>
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
          ${header}
          <section>
            ${ida}
            ${vuelta}
          </section>
          <footer>
            <p>Gracias por confiar en Flight Landers. Disfruta del viaje.</p>
          </footer>
        </body>

      </html>`;
}

function setHeader(pdfData) {
  return `
    <header>
      <h3>Número de reserva: ${pdfData.bookingNumber}</h3>
      <p>Solicitada por: ${pdfData.user.email}</p>
      <p>Adultos: ${pdfData.adults}</p>
      <p>Importe total: ${pdfData.priceTotal} €</p>
    </header>`;
}

function setDirection(pdfData, direccion = 'ida') {
  const d = direccion === 'vuelta' ? 1 : 0;
  if (pdfData.travel.direction[d]) {
    const seed = pdfData.travel.direction[d];
    return `
      <h4>Trayecto ${direccion}</h4>
        <ul>
          <li>Origen: ${seed.origin}</li>
          <li>Destino:${seed.destination}</li>
          <li>Salida: ${seed.departure}</li>
          <li>Llegada:${seed.arrival}</li>
          <li>Paradas:${seed.stops}</li>
          <li>Duración:${seed.duration}</li>
        </ul>`;
  }
  return '';
}
