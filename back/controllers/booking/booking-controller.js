'use strict';

const { bookFlight } = require('./bookFlight');
const { deleteBooking } = require('./deleteBooking');
const { userBookings } = require('./userBookings');

module.exports = { bookFlight, deleteBooking, userBookings };
