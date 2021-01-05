'use strict';

const path = require('path');
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');
const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');

function setItineraryType(itineraryType) {
  if (!itineraryType || !['ida', 'vuelta'].includes(itineraryType)) {
    const error = new Error();
    error.code = 400;
    error.details = `Itinerary type '${itineraryType}' not valid, 'ida' or 'vuelta'`;
    error.file = path.basename(__filename);
    throw error;
  }
  const itinerary = itineraryType + 'ToVue';
  return itinerary;
}
async function getAirportByIATA(iata) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_iata = ?';
  const [result] = await pool.execute(query, [iata]);

  return result;
}

async function createFlight(bookingCache, itineraryType) {
  const itinerary = setItineraryType(itineraryType);

  const {
    Vue_origenID,
    Vue_destinoID,
    Vue_companyID,
    Vue_horaSalida,
    Vue_horaLlegada,
    Vue_duracion,
    Vue_paradas,
  } = bookingCache[`${itinerary}`];
  const pool = await db.getPool();
  const query =
    'INSERT INTO Vuelos (Vue_origenID, Vue_destinoID, Vue_companyID,Vue_horaSalida,Vue_horaLlegada,Vue_duracion,Vue_paradas) VALUES (?,?,?,?,?,?,?)';
  const [result] = await pool.execute(query, [
    Vue_origenID,
    Vue_destinoID,
    Vue_companyID,
    Vue_horaSalida,
    Vue_horaLlegada,
    Vue_duracion,
    Vue_paradas,
  ]);

  verifyMysqlWrite(result);
  return result.insertId;
  // console.log(Vue_companyID);
}

module.exports = { getAirportByIATA, createFlight, createBookingHeader, createBookingDetail };
