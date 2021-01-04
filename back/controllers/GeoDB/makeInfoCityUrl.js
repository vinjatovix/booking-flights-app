'use strict';

/**
 *Creates an URL for grab info from GeoDB
 *
 * @param {String} Pais_iso2 "2 Chars string"
 * @param {Object} airport "Object with airport information."
 * @param {String} latitude
 * @param {String} longitude
 * @return {String}
 */
function makeInfoCityUrl(airport) {
  let { city, latitude, longitude } = airport;
  latitude = latitude > 0 ? `%2B${latitude.toFixed(4)}` : latitude.toFixed(4);
  longitude = longitude > 0 ? `%2B${longitude.toFixed(4)}` : longitude.toFixed(4);
  console.log(latitude, longitude);
  return `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}&location=${latitude}${longitude}&radius=30&distanceUnit=KM`;
}
module.exports = {
  makeInfoCityUrl,
};
// https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=Santiago&location=42.8963%2B-8.4151&radius=30&distanceUnit=KM
