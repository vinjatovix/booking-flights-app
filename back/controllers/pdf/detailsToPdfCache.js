'use strict';

function detailsToPdfCache(itineraryType, { details }) {
  if (!['ida', 'vuelta'].includes(itineraryType)) {
    const error = new Error();
    error.code = 403;
    error.details = `${itineraryType} no es un itinerario válido`;
    throw error;
  }

  const cache = details[`${itineraryType}`];

  const origin = cache[0].Vue_origen;
  const destination = cache[cache.length - 1].Vue_destino;
  const departure = cache[0].Vue_horaSalida.replace('T', ' ');
  const arrival = cache[cache.length - 1].Vue_horaSalida.replace('T', ' ');
  const stops = cache.length - 1;
  const duration = cache[0].Vue_duracion.replace('PT', '');
  return { origin, destination, departure, arrival, stops, duration };
}

module.exports = { detailsToPdfCache };
