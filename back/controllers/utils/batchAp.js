'use strict';
const { airportID } = require('../booking/airportID');
const airports = require('../../infraestructure/airports.json');
const { wait } = require('./utils-controller');

const batchAp = async (array) => {
  try {
    console.log('INIT');
    for (const ap of array) {
      await wait(20);
      if (ap.Aero_iata !== '\\N') {
        airportID(ap.Aero_iata, console.log);
        console.log(ap.Aero_iata);
      }
    }
  } catch (e) {
    console.log('error', e);
  } finally {
    console.log('#############################################33');
    console.log('#############################################33');
    console.log('#############################################33');
  }
};
batchAp(airports);
