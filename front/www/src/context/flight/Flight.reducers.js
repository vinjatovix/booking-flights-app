import { departureDate } from '../../utils/dateUtils';
import * as C from './Flight.constants';

export const initialFlightFormState = {
  adults: 1,
  currencyCode: 'EUR',
  departureDate: departureDate(),
  destinationLocationCode: '',
  loading: false,
  nonStop: false,
  oneWay: false,
  originLocationCode: localStorage.getItem('favAP') || '',
  response: {},
  maxPrice: 9999,
  returnDate: '',
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
    case C.FLIGHT_SET_QUESTION:
      return {
        ...state,
        ...payload,
        returnDate: payload.returnDate || null,
        nonStop: payload.nonStop === 'Directo',
        loading: true,
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
