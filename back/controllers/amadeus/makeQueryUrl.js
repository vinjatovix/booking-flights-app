'use strict';

function makeQueryUrl({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults,
  returnDate,
  nonStop,
  max = 200,
  maxPrice = 999,
}) {
  const apiUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
  if (!returnDate) {
    return `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&nonStop=${nonStop}&max=${max}&maxPrice=${maxPrice}`;
  }
  return `${apiUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=${nonStop}&max=${max}&maxPrice=${maxPrice}`;
}
exports.makeQueryUrl = makeQueryUrl;
