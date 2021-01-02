'use strict';
// const request = require('request');
const fetch = require('node-fetch');
const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
const Joi = require('joi');
const { getToken } = require('./getToken');

// const airports = require('../../infraestructure/airports.json');

async function getFlight(req, res, next) {
  try {
    const searchSchema = Joi.object({
      originLocationCode: Joi.string().min(3).max(3).required(),
      destinationLocationCode: Joi.string().min(3).max(3).required(),
      departureDate: Joi.date().iso().required(),
      returnDate: Joi.date().iso(),
      adults: Joi.number().required(),
      nonStop: Joi.boolean(),
    });
    await searchSchema.validateAsync(req.body);
    const { originLocationCode, destinationLocationCode, departureDate, returnDate, adults, nonStop } = req.body;
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
