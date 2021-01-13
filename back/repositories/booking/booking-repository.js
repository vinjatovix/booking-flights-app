'use strict';

const { createBookingDetail } = require('./createBookingDetail');
const { createBookingHeader } = require('./createBookingHeader');
const { createFlight } = require('./createFlight');
const { getBookings, getBookingDetail, getFligthData, getAirport, getCompany } = require('./showBookings');
const { itinerarySchema } = require('./itinerarySchema');

module.exports = {
  createBookingDetail,
  createBookingHeader,
  createFlight,
  getBookings,
  getBookingDetail,
  getFligthData,
  getAirport,
  getCompany,
  itinerarySchema,
};
