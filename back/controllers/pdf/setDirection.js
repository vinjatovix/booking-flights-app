'use strict';
function setDirection(pdfData, direccion = 'ida') {
  const d = direccion === 'vuelta' ? 1 : 0;
  console.log(d);

  // console.log('seed', pdfData.details[`${direccion}`]);

  if (pdfData.details[`${direccion}`][d]) {
    const seed = pdfData.details[direccion];
    console.log(seed);
    // return `${direccion}`;
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

      </ul>
    </li>
    <li>
      <ul>
      

      </ul>
      </li>
      </ul>
      </section>`;
  }
  return '';
}
exports.setDirection = setDirection;

/*     return `
      <h4>Trayecto ${direccion}</h4>
        <section class="booking-details__itinerary">
        <h4 class="booking-details__itinerary-direction">${direccion}</h4>
        <ul class="booking-details__itinerary-data">
        <li>
        <ul>
        </ul>
      </li>
      <li>
        <ul></ul>
        </ul>
      </li>
      <li>
        <ul>
        </ul>
      </li>
        </ul>
      </section>`; */
