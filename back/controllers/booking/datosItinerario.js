const { airportID } = require('./airportID');
const { airlineId } = require('./airlineID');
const path = require('path');

const stops = (itinerario) => {
  return itinerario.segments.length - 1;
};
/**
 * Returns an object with the itinerary to store in bookingCache
 *
 * @param {String} itinerarie "ida || vuelta"
 * @param {Object} req
 * @param {*} next
 * @return {Object} {paradas,horaSalida,horaLlegada,duracion,origenID,destinoID,operatingCmp_ID }
 */
async function datosItinerario(itinerarie, req, next) {
  if (!['ida', 'vuelta'].includes(itinerarie)) {
    const error = new Error();
    error.code = 400;
    error.details = 'Itinerarie not valid';
    error.file = path.basename(__filename);
    next(error);
  }
  const itinerary = itinerarie === 'ida' ? 0 : 1;
  if (!req.body.itineraries[itinerary] || req.body.itineraries.length === 0) {
    const error = new Error();
    error.code = 400;
    error.details = "You are trying to manage travel and there isn't";
    error.file = path.basename(__filename);
    next(error);
  }

  const way = req.body.itineraries[itinerary].segments;
  console.table(way)
  let paradas = {};
  for (let i = 0; i < way.length; i++) {
    paradas[`num${i}`] = {
      horaSalida: way[i].departure.at,
      horaLLegada: way[i].arrival.at,
      duracion: way.duration,
      origenID: await airportID(way[i].departure.iataCode, next),
      destinoID: await airportID(way[i].arrival.iataCode, next),
      operatingCmp_ID: await airlineId(way[i].operating.carrierCode, next),
    };
  }
  console.log('#############################################################33')
console.table(paradas)
  return {
    paradas
  };
}
module.exports = { datosItinerario };
