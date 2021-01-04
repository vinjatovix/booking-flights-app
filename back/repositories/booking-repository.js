'use strict';

const db = require('../infraestructure/database');

async function getAirportByIATA(iata) {
  const pool = await db.getPool();
  const query = 'SELECT * FROM Aeropuertos WHERE Aero_iata = ?';
  const [result] = await pool.execute(query, [iata]);

  return result;
}

async function createFlight(object) {
  const { Vue_origenID, Vue_destinoID, Vue_companyID, Vue_hora, Vue_duracion, Vue_paradas } = object;
  const pool = await db.getPool();
  const query =
    'INSERT INTO Vuelos (Vue_origenID, Vue_destinoID, Vue_companyID,Vue_hora,Vue_duracion,Vue_paradas) VALUES (?,?,?,?,?,?)';
  const [result] = await pool.execute(query, [
    Vue_origenID,
    Vue_destinoID,
    Vue_companyID,
    Vue_hora,
    Vue_duracion,
    Vue_paradas,
  ]);
  return result.insertId;
  // console.log(Vue_companyID);
}

async function createBookingHeader(object) {
  const { RC_UsrID, RC_base, RC_total } = object;
  const array = [RC_UsrID, +RC_base, +RC_total];

  const pool = await db.getPool();
  const query = 'INSERT INTO ReservaCabeceras (RC_UsrID,RC_base,RC_total) VALUES (?,?,?)';
  const [result] = await pool.execute(query, array);

  return result.insertId;
}

async function createBookingDetail(object) {
  const { RD_VueID, RD_RCID, RD_adults } = object;
  const array = [RD_VueID, RD_RCID, RD_adults];

  const pool = await db.getPool();
  const query = 'INSERT INTO ReservaDetalles (RD_VueID,RD_RCID,RD_adults) VALUES (?,?,?)';
  const [result] = await pool.execute(query, array);

  return result.insertId;
}

module.exports = { getAirportByIATA, createFlight, createBookingHeader, createBookingDetail };
