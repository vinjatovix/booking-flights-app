import { departureDate } from '../../utils/dateUtils';
import * as C from './Flight.constants';

export const initialFlightFormState = {
  adults: 1,
  currencyCode: 'EUR',
  departureDate: departureDate(),
  loading: false,
  originLocationCode: localStorage.getItem('favAP') || '',
  response: {
    adults: '1',
    data: [
      {
        type: 'flight-offer',
        id: '1',
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2021-02-21',
        numberOfBookableSeats: 4,
        itineraries: [
          {
            duration: 'PT4H20M',
            segments: [
              {
                departure: { iataCode: 'SCQ', at: '2021-02-23T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T14:45:00' },
                carrierCode: 'IB',
                number: '3875',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '1',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T16:30:00' },
                arrival: { iataCode: 'BCN', terminal: '1', at: '2021-02-23T17:50:00' },
                carrierCode: 'IB',
                number: '1630',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H20M',
                id: '2',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
          {
            duration: 'PT1H50M',
            segments: [
              {
                departure: { iataCode: 'BCN', terminal: '1', at: '2021-02-27T16:20:00' },
                arrival: { iataCode: 'SCQ', at: '2021-02-27T18:10:00' },
                carrierCode: 'IB',
                number: '5239',
                aircraft: { code: '320' },
                operating: { carrierCode: 'VY' },
                duration: 'PT1H50M',
                id: '9',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          total: '465.53',
          base: '422.00',
          fees: [
            { amount: '0.00', type: 'SUPPLIER' },
            { amount: '0.00', type: 'TICKETING' },
          ],
          grandTotal: '465.53',
        },
        pricingOptions: { fareType: ['PUBLISHED'], includedCheckedBagsOnly: true },
        validatingAirlineCodes: ['IB'],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: { currency: 'EUR', total: '465.53', base: '422.00' },
            fareDetailsBySegment: [
              {
                segmentId: '1',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '2',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '9',
                cabin: 'ECONOMY',
                fareBasis: 'QRTNVY',
                class: 'Q',
                includedCheckedBags: { quantity: 1 },
              },
            ],
          },
        ],
      },
      {
        type: 'flight-offer',
        id: '2',
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2021-02-21',
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: 'PT4H20M',
            segments: [
              {
                departure: { iataCode: 'SCQ', at: '2021-02-23T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T14:45:00' },
                carrierCode: 'IB',
                number: '3875',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '1',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T16:30:00' },
                arrival: { iataCode: 'BCN', terminal: '1', at: '2021-02-23T17:50:00' },
                carrierCode: 'IB',
                number: '1630',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H20M',
                id: '2',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
          {
            duration: 'PT23H5M',
            segments: [
              {
                departure: { iataCode: 'BCN', terminal: '1', at: '2021-02-27T09:35:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-27T11:00:00' },
                carrierCode: 'IB',
                number: '1001',
                aircraft: { code: '320' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H25M',
                id: '3',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-28T07:25:00' },
                arrival: { iataCode: 'SCQ', at: '2021-02-28T08:40:00' },
                carrierCode: 'IB',
                number: '3876',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '4',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          total: '519.37',
          base: '455.00',
          fees: [
            { amount: '0.00', type: 'SUPPLIER' },
            { amount: '0.00', type: 'TICKETING' },
          ],
          grandTotal: '519.37',
          additionalServices: [{ amount: '120.00', type: 'CHECKED_BAGS' }],
        },
        pricingOptions: { fareType: ['PUBLISHED'], includedCheckedBagsOnly: true },
        validatingAirlineCodes: ['IB'],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: { currency: 'EUR', total: '519.37', base: '455.00' },
            fareDetailsBySegment: [
              {
                segmentId: '1',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '2',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '3',
                cabin: 'ECONOMY',
                fareBasis: 'AJNQM4',
                brandedFare: 'BAGSEAT',
                class: 'A',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '4',
                cabin: 'ECONOMY',
                fareBasis: 'AJNQM4',
                brandedFare: 'BAGSEAT',
                class: 'A',
                includedCheckedBags: { quantity: 1 },
              },
            ],
          },
        ],
      },
      {
        type: 'flight-offer',
        id: '3',
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2021-02-21',
        numberOfBookableSeats: 1,
        itineraries: [
          {
            duration: 'PT4H20M',
            segments: [
              {
                departure: { iataCode: 'SCQ', at: '2021-02-23T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T14:45:00' },
                carrierCode: 'IB',
                number: '3875',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '1',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T16:30:00' },
                arrival: { iataCode: 'BCN', terminal: '1', at: '2021-02-23T17:50:00' },
                carrierCode: 'IB',
                number: '1630',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H20M',
                id: '2',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
          {
            duration: 'PT3H35M',
            segments: [
              {
                departure: { iataCode: 'BCN', terminal: '1', at: '2021-02-27T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-27T14:55:00' },
                carrierCode: 'IB',
                number: '1331',
                aircraft: { code: '320' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H25M',
                id: '7',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-27T15:45:00' },
                arrival: { iataCode: 'SCQ', at: '2021-02-27T17:05:00' },
                carrierCode: 'IB',
                number: '3878',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H20M',
                id: '8',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          total: '579.61',
          base: '523.00',
          fees: [
            { amount: '0.00', type: 'SUPPLIER' },
            { amount: '0.00', type: 'TICKETING' },
          ],
          grandTotal: '579.61',
          additionalServices: [{ amount: '100.00', type: 'CHECKED_BAGS' }],
        },
        pricingOptions: { fareType: ['PUBLISHED'], includedCheckedBagsOnly: false },
        validatingAirlineCodes: ['IB'],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: { currency: 'EUR', total: '579.61', base: '523.00' },
            fareDetailsBySegment: [
              {
                segmentId: '1',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '2',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '7',
                cabin: 'ECONOMY',
                fareBasis: 'SJN0B4',
                brandedFare: 'NOBAG',
                class: 'S',
                includedCheckedBags: { quantity: 0 },
              },
              {
                segmentId: '8',
                cabin: 'ECONOMY',
                fareBasis: 'SJN0B4',
                brandedFare: 'NOBAG',
                class: 'S',
                includedCheckedBags: { quantity: 0 },
              },
            ],
          },
        ],
      },
      {
        type: 'flight-offer',
        id: '4',
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2021-02-21',
        numberOfBookableSeats: 1,
        itineraries: [
          {
            duration: 'PT4H20M',
            segments: [
              {
                departure: { iataCode: 'SCQ', at: '2021-02-23T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T14:45:00' },
                carrierCode: 'IB',
                number: '3875',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '1',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-23T16:30:00' },
                arrival: { iataCode: 'BCN', terminal: '1', at: '2021-02-23T17:50:00' },
                carrierCode: 'IB',
                number: '1630',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H20M',
                id: '2',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
          {
            duration: 'PT19H10M',
            segments: [
              {
                departure: { iataCode: 'BCN', terminal: '1', at: '2021-02-27T13:30:00' },
                arrival: { iataCode: 'MAD', terminal: '4', at: '2021-02-27T14:55:00' },
                carrierCode: 'IB',
                number: '1331',
                aircraft: { code: '320' },
                operating: { carrierCode: 'IB' },
                duration: 'PT1H25M',
                id: '5',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
              {
                departure: { iataCode: 'MAD', terminal: '4', at: '2021-02-28T07:25:00' },
                arrival: { iataCode: 'SCQ', at: '2021-02-28T08:40:00' },
                carrierCode: 'IB',
                number: '3876',
                aircraft: { code: '32A' },
                operating: { carrierCode: 'I2' },
                duration: 'PT1H15M',
                id: '6',
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'EUR',
          total: '587.37',
          base: '523.00',
          fees: [
            { amount: '0.00', type: 'SUPPLIER' },
            { amount: '0.00', type: 'TICKETING' },
          ],
          grandTotal: '587.37',
          additionalServices: [{ amount: '100.00', type: 'CHECKED_BAGS' }],
        },
        pricingOptions: { fareType: ['PUBLISHED'], includedCheckedBagsOnly: false },
        validatingAirlineCodes: ['IB'],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: { currency: 'EUR', total: '587.37', base: '523.00' },
            fareDetailsBySegment: [
              {
                segmentId: '1',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '2',
                cabin: 'ECONOMY',
                fareBasis: 'KJN0S4',
                brandedFare: 'FLEXIBLE',
                class: 'K',
                includedCheckedBags: { quantity: 1 },
              },
              {
                segmentId: '5',
                cabin: 'ECONOMY',
                fareBasis: 'SJN0B4',
                brandedFare: 'NOBAG',
                class: 'S',
                includedCheckedBags: { quantity: 0 },
              },
              {
                segmentId: '6',
                cabin: 'ECONOMY',
                fareBasis: 'SJN0B4',
                brandedFare: 'NOBAG',
                class: 'S',
                includedCheckedBags: { quantity: 0 },
              },
            ],
          },
        ],
      },
    ],
  },
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
