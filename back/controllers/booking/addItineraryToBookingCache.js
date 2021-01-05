'use strict';
const { setItineraryType } = require('./setItineraryType');

/**
 * Adds an itinerary to the booking cache
 *
 * @param {Object} bookingCache
 * @param {Object} itineraryObject "Receives an object with itinerary data"
 * @param {String} itineraryType "'ida' || 'vuelta'"
 * @return {Object} "Updated Cache"
 */
async function addItineraryToBookingCache(bookingCache, itineraryObject, itineraryType) {
  const itinerary = await setItineraryType(itineraryType);

  bookingCache[`${itinerary}`] = {
    Vue_paradas: itineraryObject.paradas,
    Vue_horaSalida: itineraryObject.horaSalida,
    Vue_horaLlegada: itineraryObject.horaLLegada,
    Vue_duracion: itineraryObject.duracion,
    Vue_origenID: itineraryObject.origenID,
    Vue_destinoID: itineraryObject.destinoID,
    Vue_companyID: itineraryObject.operatingCmp_ID,
  };
  return bookingCache;
}
module.exports = { addItineraryToBookingCache };
