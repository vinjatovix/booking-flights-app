'use strict';

function detailsToPdfCache(itinerary, bookingCache) {
  if (!['ida', 'vuelta'].includes(itinerary)) {
    const error = new Error();
    error.code = 403;
    error.details = `${itinerary} is not a valid itinerary`;
    throw error;
  }
  const cache = bookingCache.details[`${itinerary}`];

  const origin = cache[0].Vue_origen;
  const destination = cache[cache.length - 1].Vue_destino;
  const departure = cache[0].Vue_horaSalida.replace('T', ' ');
  const arrival = cache[cache.length - 1].Vue_horaSalida.replace('T', ' ');
  const stops = cache.length - 1;
  const duration = cache[0].Vue_duracion.replace('PT', '');
  return { origin, destination, departure, arrival, stops, duration };
}

module.exports = { detailsToPdfCache };
