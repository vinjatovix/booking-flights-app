import React, { useEffect, useState } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm/SearchForm';
import { ResponseHeader } from '../components/SearchFlight/ResponseHeader/ResponseHeader';
import { ResponseList } from '../components/SearchFlight/ResponseList/ResponseList';

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
      bookDone,
    },
    dispatch,
  ] = useFlightContext();
  useEffect(() => {}, [response, menu]);

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
      {bookDone}
    </>
  );
};
