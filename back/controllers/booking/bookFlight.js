'use strict';

const path = require('path');

const { basicInputDataValidation } = require('./basicInputDataValidation');
const { setInitialBookingCache } = require('./setInitialBookingCache');
const { pushDetailsIntoCache } = require('./pushDetailsIntoCache');
const { bookingHeaderSchema } = require('../../repositories/booking/bookingHeaderSchema');
const { createBookingHeader } = require('../../repositories/booking/booking-repository');
const { sendBookingPDF } = require('../pdf/pdf-controller');

/**
 * Stores a new booking on the system
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function bookFlight(req, res, next) {
  try {
    basicInputDataValidation(req);

    let bookingCache = setInitialBookingCache(req);

    await bookingHeaderSchema.validateAsync(bookingCache.header);
    bookingCache.header.RC_ID = await createBookingHeader(bookingCache, next);

    bookingCache.details = await pushDetailsIntoCache('ida', bookingCache, req, next);
    if (req.body.itineraries[1]) {
      bookingCache.details = await pushDetailsIntoCache('vuelta', bookingCache, req, next);
    }
    await sendBookingPDF(bookingCache, req, next);

    res.status(200).json({
      ok: true,
      bookingCache,
    });
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
