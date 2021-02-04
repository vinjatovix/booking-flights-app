import * as C from './Flight.constants';

export const initialFlightFormState = {
  oneWay: false,
  originLocationCode: 'SCQ',
  destinationLocationCode: 'FCO',
  departureDate: '2021-03-01',
  returnDate: '2021-03-06',
  adults: 1,
  currencyCode: 'EUR',
  nonStop: false,
  maxPrice: 999,
  max: 10,
  searching: false,
  response: {},
};

export const FlightReducer = (state, { type, payload }) => {
  switch (type) {
    case C.INVERT_BOOLEAN:
      return {
        ...state,
        [`${payload.name}`]: !payload.value,
      };
    case C.SET_NUMBER:
      return {
        ...state,
        [`${payload.name}`]: +payload.value,
      };
    case C.SET_STRING:
      return {
        ...state,
        [`${payload.name}`]: `${payload.value}`,
      };
    case C.SET_SEARCH_STATUS:
      return {
        ...state,
        searching: true,
      };
    case C.FLIGHT_SET_RESPONSE:
      return {
        ...state,
        response: payload,
      };

    default:
      return state;
  }
};
