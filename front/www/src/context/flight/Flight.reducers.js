import { departureDate } from '../../utils/dateUtils';
import * as C from './Flight.constants';

export const initialFlightFormState = {
  adults: 1,
  currencyCode: 'EUR',
  departureDate: departureDate(),
  loading: false,
  originLocationCode: localStorage.getItem('favAP') || '',
  response: {},
  returnDate: '',
  maxPrice: '',
  searching: false,
  booking: false,
  durationButtonState: false,
  stopsButtonState: false,
  priceButtonState: true,
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
      console.log(payload);
      return {
        ...state,
        originLocationCode: payload.originLocationCode,
        destinationLocationCode: payload.destinationLocationCode,
        loading: true,
      };
    case C.FLIGHT_SET_RESPONSE:
      return {
        ...state,
        loading: false,
        response: payload,
      };
    case C.FLIGHT_SET_ORDER:
      return {
        ...state,
        loading: false,
        response: payload,
      };
    case C.FLIGHT_SET_FILTER_ON:
      return {
        ...state,
        durationButtonState: false,
        stopsButtonState: false,
        priceButtonState: false,
        [`${payload.name}`]: payload.value,
      };
    case C.BOOKING_MAKE_BOOK:
      return {
        ...state,
        loading: false,
        booking: true,
        bookingCache: payload,
      };

    default:
      return state;
  }
};
