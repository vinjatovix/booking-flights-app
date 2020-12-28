'use strict';

//? IMPORTS
require('dotenv').config();
const express = require('express');
const loggers = require('./config/loggers');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const { e404 } = require('./middlewares/e404');
const { publicController, usersController, uploadController } = require('./controllers');

//? SETUP
//* ========= ENV
const HOST = process.env.BENDER_HOST || 'localhost';
const PORT = process.env.BENDER_PORT || 8081;
const NODE_ENV = process.env.NODE_ENV || 'development';

//? APP
const app = express();

//? MIDDLEWARES
if (NODE_ENV === 'development') app.use(loggers.morganWare());

app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//? ROUTES

//? PUBLIC
app.get('/', publicController.showLanding);
app.get('/about', publicController.showAbout);
app.get('/signin', publicController.getSignIn);
app.get('/login', publicController.getLogIn);
app.get('/update', usersController.getUpdateData);
app.get('/updatepass', usersController.getUpdatePass);

app.post('/signin', usersController.postSignIn);
app.post('/login', usersController.postLogIn);
app.post('/update', usersController.postUpdateData);
app.post('/updatepass', usersController.postUpdatePass);
app.post('/upload', uploadController.uploadAvatar);

//? AUTHORIZED

//!!!! WINSTON TIENE QUE ESTAR AL FINAL DE TODO
app.use(e404);
app.use(loggers.winstonCatch());

//? LISTEN
app.listen(PORT, () => {
  console.log(`PID:${process.pid} named ${process.title} listening on http://${HOST}:${PORT}`);
});
