'use strict';

function makeQueryUrl({
  req,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults,
  returnDate,
  nonStop,
}) {
  const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
  if (!req.body.returnDate) {
    return `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonStop}&max=250`;
  }
  return `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}&max=250`;
}
exports.makeQueryUrl = makeQueryUrl;
