'use strict';
function setDirection(pdfData, direccion = 'ida') {
  const d = direccion === 'vuelta' ? 1 : 0;

  if (pdfData.details[`${direccion}`][d]) {
    const seed = pdfData.details[direccion];
    return `
    <h4>Trayecto ${direccion}</h4>
      <section class="booking-details__itinerary">
        <ul class="booking-details__itinerary-data">
          <li>
            <ul>
              <li>${seed[0].Vue_origenLoca}</li>
              <li>${seed[0].Vue_horaSalida.split('T')[0]}</li>
              <li>${seed[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</li>
            </ul>
          </li>
          <li>
            <ul>
              <li>Paradas:${seed.length - 1}</li>
            </ul>
          </li>
        </ul>
      </section>`;
  }
  
  return '';
}
exports.setDirection = setDirection;
