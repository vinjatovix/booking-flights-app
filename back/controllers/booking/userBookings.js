'use strict';

const { createBookingData } = require('./createBookingData');
const { getBookings } = require('../../repositories/booking/booking-repository');
const jwt = require('jsonwebtoken');

async function userBookings(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);

    const RC_bookings = await getBookings(decoded.id);
    if (RC_bookings.length === 0) {
      const error = new Error();
      error.code = 400;
      error.details = 'No existen reservas';
      throw error;
    }
    const bookings = await createBookingData(RC_bookings);

    res.send(bookings);
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.code = 400;
    }
    next(error);
  }
}

module.exports = { userBookings };
