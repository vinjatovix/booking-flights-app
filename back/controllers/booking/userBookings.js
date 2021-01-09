'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');
const {
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,
} = require('../../repositories/booking/booking-repository');

/**
 *  Enters a string a returns a formatted booking object key
 * @param {Object} req {auth, body}
 * @param {Object} res
 * @param {*} next
 *
 */
async function userBookings(req, res, next) {
  try {
    //? Recuperamos los datos del usuario de su token
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    // Hacemos una consulta a la DB y recuperamos los datos de su reserva
    const RC_bookings = await getBookings(decoded.id);
    // Comprobamos que el usuario tenga alguna reserva hecha
    if (RC_bookings.length === 0) {
      const error = new Error();
      error.code = 400;
      error.details = 'User doesnt have active bookings';
      throw error;
    }
    console.log(RC_bookings);
    // Recuperamos los datos de la Reserva en detalle
    const RD_bookings = await getBookingDetail(RC_bookings[0].RC_ID);
    console.log(RD_bookings);
    // Recuperamos los datos de los vuelos asignados a esa reserva
    const fligthData = await getFligthData([RD_bookings[0].RD_VueID, RD_bookings[1].RD_VueID]);
    console.log(fligthData);
    //Recuperamos el nombre de los aeropuertos
    const v1_airport = await getAirport(fligthData[0].Vue_origenID);
    const v2_airport = await getAirport(fligthData[0].Vue_destinoID);
    console.log(v1_airport);

    const data = [
      {
        vuelo_Ida: {
          origen: v1_airport.Aero_nombre,
          destino: v2_airport.Aero_nombre,
          salida: fligthData[0].Vue_horaSalida,
          llegada: fligthData[0].Vue_horaLlegada,
          plazas: RD_bookings[0].RD_adults,
          escalas: fligthData[0].Vue_paradas,
          estado: RC_bookings[0].RC_status,
        },
      },
    ];

    res.send('Aquí acaba');
  } catch (error) {
    // TODO: Si algo falla que borre todo lo escrito en la base de esta operacion

    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { userBookings };
