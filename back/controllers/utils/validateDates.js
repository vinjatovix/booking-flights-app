'use strict';
const { getMiliseconds } = require('../../repositories/booking/booking-repository');

function validateDates(departureDate, returnDate, next) {
  const date1 = getMiliseconds(departureDate);
  const date2 = getMiliseconds(returnDate);
  const date = new Date();
  const dateNow = getMiliseconds(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

  if (date1 < dateNow || (date2 && date2 < date1)) {
    const error = new Error();
    error.code = 400;
    error.details = 'La fecha introducida no es posible';
    next(error);
  }
}
exports.validateDates = validateDates;
