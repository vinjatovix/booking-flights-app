'use strict';

const { basicInputDataValidation } = require('./basicInputDataValidation');
const { bookingHeaderSchema } = require('../../repositories/schemas/bookingHeaderSchema');
const { createBookingHeader } = require('../../repositories/booking/booking-repository');
const { pushDetailsIntoCache } = require('./pushDetailsIntoCache');
const { sendBookingPDF } = require('../pdf/pdf-controller');
const { setInitialBookingCache } = require('./setInitialBookingCache');

/**
 * Stores a new booking on the system
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function bookFlight(req, res, next) {
  try {
    basicInputDataValidation(req);

    let bookingCache = await setInitialBookingCache(req);

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
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.code = 400;
    }
    err.details = err.message;
    next(err);
  }
}

module.exports = { bookFlight };
