'use strict';
const { airportID } = require('./airportID');
const { airlineId } = require('./airlineID');
const { createFlight, createBookingHeader, createBookingDetail } = require('../../repositories/booking-repository');
const { object } = require('joi');

const numeroParadas = (itinerario) => {
  return itinerario.segments.length - 1;
};
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

const bookFlight = async (req, res, next) => {
  try {
    const booking = {};
    //? Airline Info
    // const validatingAirlineIata = req.body.validatingAirlineCodes;
    // const validatingCmp_ID = await airlineId(validatingAirlineIata, next);

    //? Flight info
    const ida = req.body.itineraries[0];
    const idaParadas = numeroParadas(ida);
    const idaCarrierId = ida.segments[0].operating.carrierCode;
    const idaOperatingCmp_ID = await airlineId([idaCarrierId], next);
    const idaOriginLocationCode = ida.segments[0].departure.iataCode;
    const idaOrigenID = await airportID(idaOriginLocationCode, next);
    const idaDestinationLocationCode = ida.segments[idaParadas].arrival.iataCode;
    const idaFechaSalida = ida.segments[0].departure.at;
    const idaFechaLLegada = ida.segments[idaParadas].arrival.at;

    const vuelta = req.body.itineraries[1];
    const vueltaParadas = numeroParadas(vuelta);
    const vueltaCarrierId = vuelta.segments[vueltaParadas].operating.carrierCode;
    const vueltaOperatingCmp_ID = await airlineId([vueltaCarrierId], next);
    const vueltaFechaSalida = vuelta.segments[0].departure.at;
    const vueltaFechaLLegada = vuelta.segments[vueltaParadas].arrival.at;

    //? Airport Info
    
    const idaDestinoID = await airportID(idaDestinationLocationCode, next);
    console.log(idaOrigenID, idaDestinoID);

    //? Price Info
    const { price } = req.body;

    //? User Info
    //? Booking data
    booking.idaToVue = {
      Vue_origenID: idaOrigenID,
      Vue_destinoID: idaDestinoID,
      Vue_companyID: idaOperatingCmp_ID,
      Vue_hora: idaFechaSalida,
      Vue_duracion: ida.duration,
      Vue_paradas: idaParadas,
    };
    booking.vueltaToVue = {
      Vue_origenID: idaDestinoID,
      Vue_destinoID: idaOrigenID,
      Vue_companyID: vueltaOperatingCmp_ID,
      Vue_hora: vueltaFechaSalida,
      Vue_duracion: vuelta.duration,
      Vue_paradas: vueltaParadas,
    };
    const idaVue_ID = await createFlight(booking.idaToVue);
    const vueltaVue_ID = await createFlight(booking.vueltaToVue);
    booking.toRC = {
      RC_UsrID: req.auth.id,
      RC_base: price.base,
      RC_total: price.grandTotal,
    };
    const RC_ID = await createBookingHeader(booking.toRC);
    booking.toRD = [
      {
        RD_VueID: idaVue_ID,
        RD_RCID: RC_ID,
        RD_adults: 1,
      },
      {
        RD_VueID: vueltaVue_ID,
        RD_RCID: RC_ID,
        RD_adults: 1,
      },
    ];
    let arr = [];
    for (const vuelo of booking.toRD) {
      arr.push(await createBookingDetail(vuelo));
    }
    console.log(arr);
    const rDetails = await booking.toRD.map((object) => createBookingDetail(object));
    console.log(await rDetails);
    console.table(booking);
    // console.log(reservaCabeceraID);

    //? Response
    res.status(200).send(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = { bookFlight };
