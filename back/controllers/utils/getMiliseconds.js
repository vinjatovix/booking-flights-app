'use strict';

function getMiliseconds(date) {
  let splitDate = date.split('-');
  const miliseconds = Date.UTC(splitDate[0], splitDate[1], splitDate[2], 0, 0, 0);
  return miliseconds;
}
module.exports = { getMiliseconds };
