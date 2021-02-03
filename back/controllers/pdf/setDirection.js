'use strict';
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
exports.setDirection = setDirection;
