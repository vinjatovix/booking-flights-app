'use strict';

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

const HOST = process.env.BENDER_HOST || 'localhost';
const PORT = process.env.BENDER_PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';
process.title = process.env.BENDER_TITLE || 'benderServer';

const app = express();

if (NODE_ENV === 'development') app.use(loggers.morganWare());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + '/public')));

app.get('/about', publicController.showAbout);
app.get('/login', publicController.getLogIn);
app.get('/me', usersController.verifyToken);
app.get('/search/flights', amadeusController.getFlight);
app.get('/signin', publicController.getSignIn);

app.post('/google', usersController.googleLogin);
app.post('/login', usersController.postLogIn);
app.post('/signin', usersController.postSignIn);

app.get('/user/image', usersController.getImage());
app.get('/update', validateAuth, usersController.getUpdateData);
app.get('/update/pass', validateAuth, usersController.getUpdatePass);

app.put('/update/data', validateAuth, usersController.postUpdateData);
app.put('/update/pass', validateAuth, usersController.postUpdatePass);

app.put('/update/upload', validateAuth, uploadController.uploadAvatar);
app.put('/update/delete', validateAuth, usersController.deleteAccount);
app.put('/myBookings/delete', validateAuth, bookingController.deleteBooking);
app.post('/book/flight', validateAuth, bookingController.bookFlight);
app.post('/myBookings', validateAuth, bookingController.userBookings);

app.use(e404);
app.use(loggers.winstonCatch());

app.listen(PORT, () => {
  console.log(`PID:${process.pid} nombrado como ${process.title} escuchando en http://${HOST}:${PORT}`);
});
