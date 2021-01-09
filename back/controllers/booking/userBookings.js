'use strict';

const path = require('path');
const jwt = require('jsonwebtoken');
const {
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,
  getCompany,
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
    // Recuperamos los datos de la Reserva en detalle
    const RD_bookings = await getBookingDetail(RC_bookings[0].RC_ID);
    // Recuperamos los datos de los vuelos asignados a esa reserva
    const fligthData = await getFligthData([RD_bookings[0].RD_VueID, RD_bookings[1].RD_VueID]);
    //Recuperamos el nombre de los aeropuertos
    const v1_airport1 = await getAirport(fligthData[0].Vue_origenID);
    const v1_airport2 = await getAirport(fligthData[0].Vue_destinoID);
    const v2_airport1 = await getAirport(fligthData[1].Vue_origenID);
    const v2_airport2 = await getAirport(fligthData[1].Vue_destinoID);
    //Recuperamos el nombre de las compañías
    const v1_company = await getCompany(fligthData[0].Vue_companyID);
    const v2_company = await getCompany(fligthData[1].Vue_companyID);

    const data = [
      {
        vuelo_Ida: {
          origen: v1_airport1[0].Aero_nombre,
          destino: v1_airport2[0].Aero_nombre,
          salida: fligthData[0].Vue_horaSalida,
          llegada: fligthData[0].Vue_horaLlegada,
          plazas: RD_bookings[0].RD_adults,
          escalas: fligthData[0].Vue_paradas,
          compañía: v1_company[0].Cmp_nombre,
          duración: fligthData[0].Vue_duracion,
        },
        vuelo_Vuelta: {
          origen: v2_airport1[0].Aero_nombre,
          destino: v2_airport2[0].Aero_nombre,
          salida: fligthData[1].Vue_horaSalida,
          llegada: fligthData[1].Vue_horaLlegada,
          plazas: RD_bookings[1].RD_adults,
          escalas: fligthData[1].Vue_paradas,
          compañía: v2_company[0].Cmp_nombre,
          duración: fligthData[1].Vue_duracion,
        },
        detalles: {
          por_persona: RC_bookings[0].RC_base,
          total: RC_bookings[0].RC_total,
          estado: RC_bookings[0].RC_status,
        },
      },
    ];

    res.send(data);
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { userBookings };
