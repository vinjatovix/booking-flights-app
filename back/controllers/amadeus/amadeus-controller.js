'use strict';
// const request = require('request');
const fetch = require('node-fetch');
const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
const Joi = require('joi');
const { getToken } = require('./getToken');
const { validAirport, getMiliseconds } = require('../../repositories/booking-repository');

// const airports = require('../../infraestructure/airports.json');

async function getFlight(req, res, next) {
  try {
    const searchSchema = Joi.object({
      originLocationCode: Joi.string().min(3).max(3).required(),
      destinationLocationCode: Joi.string().min(3).max(3).required(),
      departureDate: Joi.date().iso().required(),
      returnDate: Joi.date().iso(),
      adults: Joi.number().greater(0).required(),
      nonStop: Joi.boolean(),
    });
    await searchSchema.validateAsync(req.body);

    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, nonStop } = req.body;

    if (req.body.nonStop === undefined) {
      req.body.nonStop = 'false';
    }

    const airport1 = validAirport(originLocationCode);
    const airport2 = validAirport(destinationLocationCode);

    if (airport1 !== true || airport2 !== true) {
      throw new Error('Please choose a valid airport');
    }

    console.log(req.body);

    const date1 = getMiliseconds(departureDate);
    const date2 = getMiliseconds(returnDate);
    const date = new Date();
    const dateNow = getMiliseconds(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    if (date1 < dateNow) {
      throw new Error('Choose an available date');
    }

    // Comprobar cuando se distinga de ida o ida y vuelta comprobar si funciona esta validación
    if (date2 && date2 < date1) {
      throw new Error('Choose an available date. Return date cannot be earlier than the date of origin');
    }

    console.log(nonStop);

    await getToken(next);
    const response = await fetch(
      `${url}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}`,
      {
        method: 'get',
        headers: { authorization: 'Bearer ' + process.env.AMADEUS_TOKEN },
      }
    ).then((res) => res.json());
    const data = response.data;
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getFlight };
