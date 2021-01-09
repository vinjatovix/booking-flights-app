'use strict';
const db = require('../../infraestructure/database');
/**
 * Stores a flight in db if it wasn't already
 *
 * @param {Object} segment
 * @param {String} itineraryType "ida || vuelta"
 * @return {Number} "Vue_ID"
 */
async function createFlight(segment, next) {
  try {
    const {
      Vue_origenID,
      Vue_destinoID,
      Vue_companyID,
      Vue_aircraft,
      Vue_horaSalida,
      Vue_horaLlegada,
      Vue_duracion,
      Vue_paradas,
    } = segment;

    const pool = await db.getPool();
    const fligthExists = 'SELECT Vue_ID FROM Vuelos WHERE (Vue_origenID,Vue_companyID,Vue_horaSalida) = (?,?,?)';
    const [storedFlight] = await pool.execute(fligthExists, [Vue_origenID, Vue_companyID, Vue_horaSalida]);

    if (!storedFlight || storedFlight.length === 0) {
      const newFlight =
        'INSERT INTO Vuelos (Vue_origenID, Vue_destinoID, Vue_companyID, Vue_aircraft, Vue_horaSalida, Vue_horaLlegada, Vue_duracion, Vue_paradas) VALUES (?,?,?,?,?,?,?,?)';
      const [result] = await pool.execute(newFlight, [
        Vue_origenID,
        Vue_destinoID,
        Vue_companyID,
        Vue_aircraft,
        Vue_horaSalida,
        Vue_horaLlegada,
        Vue_duracion,
        Vue_paradas,
      ]);

      return result.insertId;
    } else {
      return storedFlight[0].Vue_ID;
    }
  } catch (err) {
    err.code = isNaN(err.code) ? 500 : err.code;
    next(err);
  }
}
module.exports = { createFlight };
