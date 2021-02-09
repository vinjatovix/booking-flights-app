export function createUrl({
  endPoint,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  nonStop,
  max = 10,
  maxPrice = 9999,
}) {

  return `${endPoint}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&nonStop=${nonStop}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
}
