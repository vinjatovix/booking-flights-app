'use strict';

const { getBookingDetail, getFligthData, getCompany } = require('../../repositories/booking/booking-repository');

const { getAirport, getTown } = require('../../repositories/location/location-repository');
/**
 * Crea objetos con las distintas reservas del usuario
 *
 * @param {*} bookings
 * @return {*}
 */
async function createBookingData(bookings) {
  let bookingData = [];
  for (const booking of bookings) {
    // Recuperamos los datos de las Reservas en detalle
    const RD_bookings = await getBookingDetail(booking.RC_ID);
    // Calculamos el número de escalas de la ida y la vuelta
    const counter = { ida: 0, vuelta: 0 };
    for (const booking of RD_bookings) {
      if (booking.RD_direccion === 0) {
        counter.ida++;
      } else counter.vuelta++;
    }
    // Recuperamos los datos de los vuelos asignados a esa reserva
    const fligthData = await getFligthData(RD_bookings[0].RD_VueID);
    const fligthData2 = await getFligthData(RD_bookings[RD_bookings.length - 1].RD_VueID);
    //Recuperamos el nombre de los aeropuertos
    const airport1 = await getAirport(fligthData[0].Vue_origenID);
    const airport2 = await getAirport(fligthData2[0].Vue_origenID);
    //Recuperamos el nombre de las compañías
    const company = await getCompany(fligthData[0].Vue_companyID);
    const originTown = await getTown(airport1[0].Aero_LocaID);
    const destinationTown = await getTown(airport2[0].Aero_LocaID);

    const data = {
      vuelo_Ida: {
        origen: airport1[0].Aero_nombre,
        destino: airport2[0].Aero_nombre,
        salida: fligthData[0].Vue_horaSalida,
        locaOrigen: originTown[0].Loca_nombre,
        locaDesti: destinationTown[0].Loca_nombre,
        llegada: fligthData2[0].Vue_horaSalida,
        escalas: counter.ida - 1,
        compania: company[0].Cmp_nombre,
        duracion: fligthData[0].Vue_duracion,
      },
    };

    if (RD_bookings[RD_bookings.length - 1].RD_direccion === 1) {
      const originElement = (element) => element.RD_direccion === 1;
      const originId = RD_bookings.findIndex(originElement);

      const fligthData = await getFligthData(RD_bookings[originId].RD_VueID);
      const fligthData2 = await getFligthData(RD_bookings[0].RD_VueID);
      const airport1 = await getAirport(fligthData[0].Vue_origenID);
      const airport2 = await getAirport(fligthData2[0].Vue_origenID);
      const company = await getCompany(fligthData[0].Vue_companyID);
      const originTown = await getTown(airport1[0].Aero_LocaID);
      const destinationTown = await getTown(airport2[0].Aero_LocaID);

      data.vuelo_Vuelta = {
        origen: airport1[0].Aero_nombre,
        destino: airport2[0].Aero_nombre,
        locaOrigen: originTown[0].Loca_nombre,
        locaDesti: destinationTown[0].Loca_nombre,
        salida: fligthData[0].Vue_horaSalida,
        llegada: fligthData[0].Vue_horaLlegada,
        escalas: counter.vuelta - 1,
        compania: company[0].Cmp_nombre,
        duracion: fligthData[0].Vue_duracion,
      };
    }

    data.details = {
      id: booking.RC_ID,
      plazas: booking.RC_adults,
      precio: booking.RC_total,
      total: (booking.RC_total * booking.RC_adults).toFixed(2),
      estado: booking.RC_status,
    };

    bookingData.push(data);
  }
  return bookingData;
}

module.exports = { createBookingData };
