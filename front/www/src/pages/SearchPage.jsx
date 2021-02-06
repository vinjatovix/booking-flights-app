import React, { useEffect, useState } from 'react';
import '../components/SearchFlight/searchForm.css';
import { useAuthContext } from '../context/Auth.context';
import { useFlightContext } from '../context/flight/Flight.context';
import { SearchForm } from '../components/SearchFlight/SearchForm';
import { ResponseFlight } from '../components/SearchFlight/ResponseFlight';
import { ResponseHeader } from '../components/SearchFlight/ResponseHeader';
import { Loading } from '../components/common/Loading/Loading';

export const SearchPage = () => {
  const [order, setOrder] = useState('');

  const [
    {
      oneWay,
      adults,
      nonStop,
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      searching,
      loading,
      max,
      maxPrice,
      response,
    },
    dispatch,
  ] = useFlightContext();
  const [{ logged }] = useAuthContext([]);

  useEffect(() => {}, [order]);
  return (
    <>
      {!searching && (
        <SearchForm
          endPoint="http://localhost:8337/search/flights"
          oneWay={oneWay}
          adults={adults}
          nonStop={nonStop}
          originLocationCode={originLocationCode}
          destinationLocationCode={destinationLocationCode}
          departureDate={departureDate}
          returnDate={returnDate}
          searching={searching}
          loading={loading}
          dispatch={dispatch}
          max={max}
          maxPrice={maxPrice}
        />
      )}
      {loading && <Loading />}
      {searching && (
        <ResponseHeader
          dispatch={dispatch}
          originLocationCode={originLocationCode}
          destinationLocationCode={destinationLocationCode}
          departureDate={departureDate}
          returnDate={returnDate}
          searching={searching}
          adults={adults}
          setOrder={setOrder}
        />
      )}

      <ul className="Response-list">
        {response?.data?.map((element) => (
          <ResponseFlight key={element.id} id={element.id} auth={logged} {...element} />
        ))}
      </ul>
    </>
  );
};
