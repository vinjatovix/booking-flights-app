'use strict';

function makeInfoCityUrl(airport) {
  let { city, latitude, longitude } = airport;
  latitude = latitude > 0 ? `%2B${latitude.toFixed(4)}` : latitude.toFixed(4);
  longitude = longitude > 0 ? `%2B${longitude.toFixed(4)}` : longitude.toFixed(4);
  return `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}&location=${latitude}${longitude}&radius=300&distanceUnit=KM`;
}
module.exports = {
  makeInfoCityUrl,
};
