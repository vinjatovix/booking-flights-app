'use strict';
function drawItinerary(dir, header) {
  return `
  <div class="ida">

  <section class="modal-booking-flight-data">
    <div>

      <h5>SALIDA</h5>
      <p>${dir[0].Vue_origen}</p>
      <h4>${dir[0].Vue_horaSalida.split('T')[0]}</h4>
      <h4>${dir[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</h4>
    </div>
    <div>
      <h5>${header.aerolineaIda}</h5>
      <h6>Duración: ${header.duracionIda.replace('PT', '')}</h6>
      <h6>Escalas: ${dir.length - 1}</h6>
    </div>
    <div>
      <h5>LLEGADA</h5>
      <p>${dir[dir.length - 1].Vue_destino}</p>
      <h4>${dir[dir.length - 1].Vue_horaLlegada.split('T')[0]}</h4>
      <h4>${dir[dir.length - 1].Vue_horaLlegada.split('T')[1].replace(':00', '')}</h4>
    </div>
  </section>
</div>
  `;
}
exports.drawItinerary = drawItinerary;
