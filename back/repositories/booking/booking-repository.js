'use strict';

const { cancelBooking } = require('./cancelBooking');
const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');
const { createFlight } = require('./createFlight');
const { getBookings } = require('./getBookings');
const { getFligthData } = require('./getFligthData');
const { getBookingDetail } = require('./getBookingDetail');
const { getCompany } = require('./getCompany');
const { validAirport } = require('./supportBookingFunctions');

module.exports = {
  cancelBooking,
  createBookingDetail,
  createBookingHeader,
  createFlight,
  getBookings,
  getBookingDetail,
  getCompany,
  getFligthData,
  validAirport,
};
