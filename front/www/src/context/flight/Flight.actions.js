import * as C from './Flight.constants';

export const switchBoolean = (payload) => ({
  type: C.INVERT_BOOLEAN,
  payload,
});
export const setAdults = (payload) => ({
  type: C.FLIGHT_SET_PASSENGERS,
  payload,
});
export const setNumber = (payload) => ({
  type: C.SET_NUMBER,
  payload,
});
export const setString = (payload) => ({
  type: C.SET_STRING,
  payload,
});
export const setStatus = (payload) => ({
  type: C.SET_SEARCH_STATUS,
  payload,
});
export const saveResponse = (payload) => ({
  type: C.FLIGHT_SET_RESPONSE,
  payload,
});
export const makeBooking = (payload) => ({
  type: C.BOOKING_MAKE_BOOK,
  payload,
});
