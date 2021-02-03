'use strict';
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
exports.fillTemplate = fillTemplate;
