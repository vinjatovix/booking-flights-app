'use strict';
const db = require('../../infraestructure/database');
const { verifyMysqlWrite } = require('../verifyMysqlWrite');
const { setItineraryType } = require('./booking-repository');

async function createFlight(bookingCache, itineraryType) {
  console.log(itineraryType);
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
module.exports = { createFlight };
