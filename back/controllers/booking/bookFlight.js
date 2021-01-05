'use strict';

const path = require('path');
const { basicInputDataValidation } = require('./basicInputDataValidation');
const { setInitialBookingCache } = require('./setInitialBookingCache');
const { pushDetailsIntoCache } = require('./pushDetailsIntoCache');
const { createBookingHeader, createBookingDetail } = require('../../repositories/booking/booking-repository');
const { bookingHeaderSchema } = require("../../repositories/booking/bookingHeaderSchema");

/**
 *  Receives flight booking data object, writes on MySQL DB and returns the results of the Booking
 *
 * @param {Object} req {auth,body}
 * @param {Object} res
 * @param {*} next
 */
async function bookFlight(req, res, next) {
  try {
    //? Validamos que existe el usuario y que los datos de entrada llegan
    basicInputDataValidation(req);

    //TODO: RECIBIR NUMERO DE ADULTOS
    const adults = 3;

    //? Set the Cache
    let bookingCache = setInitialBookingCache(req, adults);

    await bookingHeaderSchema.validateAsync(bookingCache.header);
    //? Creamos la Cabecera de reserva en la base MySQL
    const RC_ID = await createBookingHeader(bookingCache);

    //? Añadimos los detalles de reserva a la cache
    bookingCache = await pushDetailsIntoCache('ida', RC_ID, bookingCache, req, next);

    if (req.body.itineraries[1]) {
      bookingCache = await pushDetailsIntoCache('vuelta', RC_ID, bookingCache, req, next);
    }

    //? Escribimos los datos de detalle en la base MySQL
    for (const detail of bookingCache.details) {
      await createBookingDetail(detail);
    }

    //? Response
    res.status(200).send(bookingCache);
  } catch (error) {
    // TODO: Si algo falla que borre todo lo escrito en la base de esta operacion

    if (error.name === 'ValidationError') {
      error.code = 400;
      error.file = path.basename(__filename);
    }
    next(error);
  }
}

module.exports = { bookFlight };
