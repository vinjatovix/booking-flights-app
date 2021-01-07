'use strict';
const { createFlight } = require('../../repositories/booking/booking-repository');
3;
const { datosItinerario } = require('./datosItinerario');
const { itinerarySchema } = require('../../repositories/booking/joiItinerarySchema');
const { addItineraryToBookingCache } = require('./addItineraryToBookingCache');
const { setItineraryType } = require('./setItineraryType');

/**
 * Push itinerary details to the booking cache
 *
 * @param {String} itinerarie "ida || vuelta"
 * @param {Number} RD_RCID "Reserva Cabecera ID to link Reserva Detalle Row"
 * @param {Object} bookingCache
 * @param {Object} req
 * @param {*} next
 * @return {object} "Bookingcache with updated details"
 */
async function pushDetailsIntoCache(itinerarie, RD_RCID, bookingCache, req, next) {
  const itinerary = await setItineraryType(itinerarie);

  //? definimos el callback a usar para los datos, ida o vuelta y lo ejecutamos
  const itineraryData = await datosItinerario(itinerarie, req, next);
  console.log('datos itinerario', itineraryData);
  //? añadimos el itinerario a la cache
  bookingCache = await addItineraryToBookingCache(bookingCache, itineraryData, itinerarie);

  // //? Validamos los datos contra el esquema para la base

  console.log('------------------> ', bookingCache[`${itinerary}`]);
  bookingCache[`${itinerary}`].map((trayecto) => itinerarySchema.validateAsync(trayecto));
  // await itinerarySchema.validateAsync(bookingCache[`${itinerary}`]);

  // //? Creamos el detalle de la reserva en la base MySQL
  // const RD_VueID = await createFlight(bookingCache, itinerarie);
  // bookingCache.details.push({ RD_RCID, RD_VueID, RD_adults: bookingCache.header.adults });
  // return bookingCache;
}

module.exports = { pushDetailsIntoCache };
