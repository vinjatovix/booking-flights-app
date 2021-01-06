'use strict';

const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');
const { createFlight } = require('./createFlight');
const { getBookings, getBookingDetail, getFligthData, getAirport } = require('./showBookings');

module.exports = {
  createFlight,
  createBookingHeader,
  createBookingDetail,
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,
};
