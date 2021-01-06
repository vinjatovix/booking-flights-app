'use strict';

const amadeusController = require('./amadeus/amadeus-controller');
const bookingController = require('./booking/booking-controller');
const geoDbController = require('./GeoDB/geoDB-controller');
const googleController = require('./google/googleLogin');
const locationController = require('./location/location-controller');
const publicController = require('./public/public-controller');
const uploadController = require('./upload/upload-controller');
const usersController = require('./user/user-controller');
const utilsController = require('./utils/utils-controller');

module.exports = {
  amadeusController,
  bookingController,
  geoDbController,
  googleController,
  locationController,
  publicController,
  uploadController,
  usersController,
  utilsController,
};
