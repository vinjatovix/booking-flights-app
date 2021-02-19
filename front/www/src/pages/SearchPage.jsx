import React, { useEffect } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm/SearchForm';
import { CustomModal } from '../components/Modal/Modal';
import { Booking } from '../components/SearchFlight/Booking/Booking';
import { Response } from '../components/SearchFlight/Response';

export const SearchPage = ({ endPoint, title, menu, logged }) => {
  const [
    {
      adults,
      departureDate,
      destinationLocationCode,
      loading,
      max,
      maxPrice,
      nonStop,
      oneWay,
      originLocationCode,
      response,
      returnDate,
      searching,
      booking,
      bookingCache,
    },
    dispatch,
  ] = useFlightContext();
  useEffect(() => {}, [response, menu, booking]);

  const searchFormProps = {
    adults,
    departureDate,
    destinationLocationCode,
    dispatch,
    endPoint,
    loading,
    max,
    maxPrice,
    menu,
    nonStop,
    oneWay,
    originLocationCode,
    returnDate,
    searching,
    title,
  };

  const responseProps = {
    adults,
    logged,
    departureDate,
    destinationLocationCode,
    dispatch,
    response,
    returnDate,
    searching,
    originLocationCode,
  };

  return (
    <>
      {!searching && <SearchForm {...searchFormProps} />}
      <Response {...responseProps} />
      {booking && <CustomModal>{bookingCache && <Booking />}</CustomModal>}
    </>
  );
};
