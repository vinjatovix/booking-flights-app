'use strict';

//? IMPORTS
require('dotenv').config();
const express = require('express');
const loggers = require('./config/loggers');
const routeUtils = require('./routes/utils/');
const utils = require('./utils/');

const { usersController } = require('./controllers');

//? SETUP
//* ========= ENV
const HOST = process.env.BENDER_HOST || 'localhost';
const PORT = process.env.BENDER_PORT || 8081;

//? APP
const app = express();

//? MIDDLEWARES
app.use(loggers.morganWare());

//? ROUTES
//? PUBLIC
app.get('/', routeUtils.helloWorld());
app.get('/testError', routeUtils.testError());
app.get('/signin', (req, res) => {
  res.status(200).send({ message: 'Sign in ask' });
});
app.get('/login', login());

app.post('/signin', (req, res) => {
  res.status(200).send({ message: 'Sign in done' });
});
app.post('/login', (req, res) => {
  res.status(200).send({ message: 'Log in done' });
});

app.get('*', routeUtils.response404());

//!!!! WINSTON TIENE QUE ESTAR AL FINAL DE TODO
app.use(loggers.winstonCatch());

//? LISTEN
app.listen(PORT, utils.serverMotto(HOST, PORT));
function login() {
  return (req, res) => {
    res.status(200).send({ message: 'Log in ask' });
  };
}
