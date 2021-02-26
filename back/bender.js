'use strict';

//? IMPORTS
require('dotenv').config();
const path = require('path');
const express = require('express');
const loggers = require('./config/loggers');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const { validateAuth } = require('./middlewares/validate-auth');
const { e404 } = require('./middlewares/e404');
const {
  publicController,
  usersController,
  uploadController,
  amadeusController,
  bookingController,
} = require('./controllers');

//? SETUP
//* ========= ENV
const HOST = process.env.BENDER_HOST || 'localhost';
const PORT = process.env.BENDER_PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';
process.title = process.env.BENDER_TITLE || 'benderServer';

//? APP
const app = express();

//? MIDDLEWARES
if (NODE_ENV === 'development') app.use(loggers.morganWare());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//? ROUTES
app.use(express.static(path.resolve(__dirname + '/public')));

//? PUBLIC
app.get('/about', publicController.showAbout);
app.get('/signin', publicController.getSignIn);
app.get('/login', publicController.getLogIn);

app.post('/signin', usersController.postSignIn);
app.post('/login', usersController.postLogIn);
app.post('/google', usersController.googleLogin);
app.get('/me', usersController.verifyToken);

//? AUTHORIZED
app.get('/user/image', function (req, res, next) {
  try {
    res.writeHead(200, { 'content-type': 'image/jpg' });
    fs.createReadStream(__dirname + `/assets/avatars/${req.query.user}`).pipe(res);
  } catch (error) {
    next(error);
  }
});
app.get('/update', validateAuth, usersController.getUpdateData);
app.get('/update/pass', validateAuth, usersController.getUpdatePass);

app.put('/update/data', validateAuth, usersController.postUpdateData);
app.put('/update/pass', validateAuth, usersController.postUpdatePass);

app.put('/update/upload', validateAuth, uploadController.uploadAvatar);
app.put('/update/delete', validateAuth, usersController.deleteAccount);
app.put('/myBookings/delete', validateAuth, bookingController.deleteBooking);
app.get('/search/flights', amadeusController.getFlight);
app.post('/book/flight', validateAuth, bookingController.bookFlight);
app.post('/myBookings', validateAuth, bookingController.userBookings);

//!!!! WINSTON TIENE QUE ESTAR AL FINAL DE TODO
app.use(e404);
app.use(loggers.winstonCatch());

//? LISTEN
app.listen(PORT, () => {
  console.log(`PID:${process.pid} nombrado como ${process.title} escuchando en http://${HOST}:${PORT}`);
});
