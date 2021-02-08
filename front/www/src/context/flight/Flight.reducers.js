import * as C from './Flight.constants';


export const initialFlightFormState = {
  adults: 1,
  currencyCode: 'EUR',
  departureDate: '2021-03-01',
  destinationLocationCode: 'FCO',
  loading: false,
  nonStop: false,
  oneWay: false,
  originLocationCode: 'SCQ',
  response: {},
  returnDate: '2021-03-06',
  searching: false,
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
        loading: false,
        response: payload,
      };

    default:
      return state;
  }
};
