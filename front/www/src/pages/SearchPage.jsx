import React, { useEffect, useState } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm';
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
    },
    dispatch,
  ] = useFlightContext();
  const [order, setOrder] = useState('');
  useEffect(() => {}, [order, response, menu]);

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
    setOrder,
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
    </>
  );
};
