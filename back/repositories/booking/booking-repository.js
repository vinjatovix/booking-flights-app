'use strict';

const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');
const { createFlight } = require('./createFlight');
const { getBookings, getBookingDetail, getFligthData, getAirport } = require('./showBookings');

const { itinerarySchema } = require('./itinerarySchema');

module.exports = {
  createFlight,
  createBookingHeader,
  createBookingDetail,
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,

  itinerarySchema,
};
