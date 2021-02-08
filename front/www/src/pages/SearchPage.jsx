import React, { useEffect, useState } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';
import { useAuthContext } from '../context/Auth.context';

/* COMPONENTS */
import { SearchForm } from '../components/SearchFlight/SearchForm';
import { ResponseFlight } from '../components/SearchFlight/ResponseFlight';
import { ResponseHeader } from '../components/SearchFlight/ResponseHeader';
import { Loading } from '../components/common/Loading/Loading';

/* STYLES */
import '../components/SearchFlight/searchForm.css';

export const SearchPage = () => {
  const [order, setOrder] = useState('');

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
  const [{ logged }] = useAuthContext([]);
  useEffect(() => {}, [order]);
  return (
    <>
      {!searching && (
        <SearchForm
          adults={adults}
          departureDate={departureDate}
          destinationLocationCode={destinationLocationCode}
          dispatch={dispatch}
          endPoint="http://localhost:8337/search/flights"
          loading={loading}
          max={max}
          maxPrice={maxPrice}
          nonStop={nonStop}
          oneWay={oneWay}
          originLocationCode={originLocationCode}
          returnDate={returnDate}
          searching={searching}
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
