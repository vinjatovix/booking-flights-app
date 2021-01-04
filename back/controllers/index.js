const usersController = require('./user/user-controller');
const publicController = require('./public/public-controller');
const uploadController = require('./upload/upload-controller');
const amadeusController = require('./amadeus/amadeus-controller');
const bookingController = require('./booking/bookingController');

module.exports = { usersController, publicController, uploadController, amadeusController, bookingController };
