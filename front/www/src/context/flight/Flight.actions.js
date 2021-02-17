import * as C from './Flight.constants';


/* BASICS */
export const switchBoolean = (payload) => ({
  type: C.INVERT_BOOLEAN,
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

/*  */



export const setFlightQuestion = (payload) => {
  return {
    type: C.FLIGHT_SET_QUESTION,
    payload,
  };
};

export const setResponse = (payload) => ({
  type: C.FLIGHT_SET_RESPONSE,
  payload,
});

export const setOrder = (payload) => ({
  type: C.FLIGHT_SET_ORDER,
  payload,
});

export const makeBooking = (payload) => ({
  type: C.BOOKING_MAKE_BOOK,
  payload,
});
