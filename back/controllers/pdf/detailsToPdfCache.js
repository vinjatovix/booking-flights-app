function detailsToPdfCache(itinerary, bookingCache) {
  if (!['ida', 'vuelta'].includes(itinerary)) {
    const error = new Error();
    error.code = 403;
    error.details = `${itinerary} is not a valid itinerary`;
    throw error;
  }

  const origin = bookingCache.details[`${itinerary}`][0].Vue_origen;
  const destination = bookingCache.details[`${itinerary}`][bookingCache.details[`${itinerary}`].length - 1].Vue_destino;
  const departure = bookingCache.details[`${itinerary}`][0].Vue_horaSalida.replace('T', ' ');
  const arrival = bookingCache.details[`${itinerary}`][
    bookingCache.details[`${itinerary}`].length - 1
  ].Vue_horaSalida.replace('T', ' ');
  const stops = bookingCache.details[`${itinerary}`].length - 1;
  const duration = bookingCache.details[`${itinerary}`][0].Vue_duracion.replace('PT', '');
  return { origin, destination, departure, arrival, stops, duration };
}

module.exports = { detailsToPdfCache };
