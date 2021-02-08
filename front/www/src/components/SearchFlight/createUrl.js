export function createUrl({
  endPoint,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  max,
  maxPrice,
}) {
  if (returnDate === '' || returnDate?.length === 0) {
    return `${endPoint}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
  }
  return `${endPoint}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&max=${max}&maxPrice=${maxPrice}`;
}
