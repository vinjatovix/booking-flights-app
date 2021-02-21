'use strict';
function drawReturnItinerary(vuelta, header) {
  return vuelta.length !== 0
    ? `         
  <div class="vuelta">

      <section class="modal-booking-flight-data">
      
      <div>
      
      <h5>SALIDA</h5>
      <p>${vuelta[0].Vue_origen}</p>
      <h4>${vuelta[0].Vue_horaSalida.split('T')[0]}</h4>
      <h4>${vuelta[0].Vue_horaSalida.split('T')[1].replace(':00', '')}</h4>
      </div>
      <div>
      <h3>RETORNO</h3>
          <h5>${header.aerolineaVuelta}</h5>
          <h6>Duración: ${header.duracionVuelta.replace('PT', '')}</h6>
          <h6>Escalas: ${vuelta.length - 1}</h6>
      </div>
      <div>
      <h5>LLEGADA</h5>
      <p>${vuelta[vuelta.length - 1].Vue_destino}</p>
      <h4>${vuelta[vuelta.length - 1].Vue_horaLlegada.split('T')[0]}</h4>
      <h4>${vuelta[vuelta.length - 1].Vue_horaLlegada.split('T')[1].replace(':00', '')}</h4>
    </div>
  </section>
</div>`
    : '';
}
exports.drawReturnItinerary = drawReturnItinerary;
