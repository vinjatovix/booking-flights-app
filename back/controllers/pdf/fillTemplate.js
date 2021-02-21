'use strict';

const { drawItinerary } = require('./drawItinerary');
const { drawReturnItinerary } = require('./drawReturnItinerary');
const { style } = require('./style');

function fillTemplate(bookingCache) {
  const { header, details } = bookingCache;
  const { RC_ID, RC_adults, RC_total } = header;
  const ida = details.ida;
  const vuelta = details.vuelta ? details.vuelta : null;
  const goingDraw = drawItinerary(ida, header);
  const returnDraw = drawReturnItinerary(vuelta, header);

  const headerD = headerDraw(RC_ID, ida);

  console.log(bookingCache);
  return `
    <!DOCTYPE html>
      <html lang="es">

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Tu reserva</title>
          <style>
         ${style}
        </style>
        </head>

        <body>
        
${headerD}
      <section class="modal-booking-logos">
      <div class="booking-logos__line"></div>
      <div class="booking-logos__plane"></div>
      <div class="booking-logos__line"></div>
      </section>
      <main class="modal-booking-main">
          ${goingDraw}
          ${returnDraw}
      </main>
      <section class="modal-booking-aditional-data">
        <div>
          <h5>PLAZAS</h5>
          <h4>${RC_adults}</h4>
        </div>
        <div>
          <h5>ESCALAS</h5>
          <h4>
            I: ${ida.length - 1}/ V: ${vuelta.length - 1}
          </h4>
        </div>
        <div>
          <h5>PRECIO TOTAL</h5>
          <h4>${RC_total}€</h4>
        </div>
      </section>

          <footer class='footer'>

            <p>Gracias por confiar en Flight Landers. Disfruta del viaje.</p>
          
          <h1>DISCLAIMER:</h1>
          <p>Aunque los datos de los vuelos son reales, esta aplicación es una simple demostración de los conocimientos adquiridos por Mateo Codesido y Pablo Viña durante el bootcamp JSB07CO de Hack A Boss en 2020/2021.</p>
          <p>Esta reserva no tiene valor real. Ni nos hacemos responsables del uso indebido de la aplicación.</p>
            </footer>
        </body>

      </html>`;
}
exports.fillTemplate = fillTemplate;
function headerDraw(RC_ID, ida) {
  return `        <header class="modal-booking-header">
  <section class="booking-header-1">
    <h1>FL</h1>
    <small>0.6</small>
  </section>
  <section class="booking-header-2">
    <h5>ID: ${RC_ID}</h5>
  </section>
</header>
<section class="booking-towns">
  <div class="booking-towns-1">
    <h4>${ida[0].Vue_origenLoca}</h4>
  </div>
  <div class="booking-towns-2">
    <h4>${ida[ida.length - 1].Vue_destinoLoca}</h4>
  </div>
</section>`;
}
