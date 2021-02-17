import React, { useEffect, useState } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm/SearchForm';
import { ResponseHeader } from '../components/SearchFlight/ResponseHeader/ResponseHeader';
import { ResponseList } from '../components/SearchFlight/ResponseList/ResponseList';
import { CustomModal } from '../components/Modal/Modal';
import { Booking } from '../components/SearchFlight/Booking/Booking';

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

  const headerProps = {
    adults,
    departureDate,
    destinationLocationCode,
    dispatch,
    response,
    returnDate,
    searching,
    originLocationCode,
  };
  const responseListProps = {
    adults,
    dispatch,
    logged,
    response,
    searching,
  };

  return (
    <>
      {!searching && <SearchForm {...searchFormProps} />}
      {response.adults && <ResponseHeader {...headerProps} />}
      <ResponseList {...responseListProps} />
      {booking && <CustomModal>{bookingCache && <Booking />}</CustomModal>}
    </>
  );
};
