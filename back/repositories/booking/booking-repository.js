'use strict';

const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');
const { createFlight } = require('./createFlight');
const { getBookings } = require('./getBookings');
const { getFligthData } = require('./getFligthData');
const { getBookingDetail } = require('./getBookingDetail');
const { getAirport } = require('../location/getAirport');
const { getCompany } = require('./getCompany');
const { cancelBooking } = require('./cancelBooking');
const { getMiliseconds, validAirport } = require('./supportBookingFunctions');

module.exports = {
  createBookingDetail,
  createBookingHeader,
  createFlight,
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,
  getCompany,
  getMiliseconds,
  validAirport,
  cancelBooking,
};
