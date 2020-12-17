'use strict';

//? IMPORTS
require('dotenv').config();
const express = require('express');
const loggers = require('./config/loggers');
const routeUtils = require('./routes/utils/');
const utils = require('./utils/');

//? SETUP
//* ========= ENV
const HOST = process.env.BENDER_HOST || 'localhost';
const PORT = process.env.BENDER_PORT || 8081;

//? APP
const app = express();

//? MIDDLEWARES
app.use(loggers.morganWare());

//? ROUTES
app.get('/', routeUtils.helloWorld());
app.get('/testError', routeUtils.testError());
app.get('*', routeUtils.response404());

//!!!! WINSTON TIENE QUE ESTAR AL FINAL DE TODO
app.use(loggers.winstonCatch());

//? LISTEN
app.listen(PORT, utils.serverMotto(HOST, PORT));
