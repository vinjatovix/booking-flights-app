import React, { useEffect, useState } from 'react';

/* CONTEXT */
import { useFlightContext } from '../context/flight/Flight.context';
import { useAuthContext } from '../context/Auth.context';

import * as A from '../context/flight/Flight.actions';

/* COMPONENTS */
import { Article } from '../components/common/Article';
import { SearchForm } from '../components/SearchFlight/SearchForm';
import { ResponseFlight } from '../components/SearchFlight/ResponseFlight';
import { ResponseHeader } from '../components/SearchFlight/ResponseHeader/ResponseHeader';

export const SearchPage = ({ action, title, menu }) => {
  const [{ logged }] = useAuthContext([]);
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
    menu: menu,
    adults: adults,
    departureDate: departureDate,
    destinationLocationCode: destinationLocationCode,
    dispatch: dispatch,
    endPoint: action,
    loading: loading,
    max: max,
    maxPrice: maxPrice,
    nonStop: nonStop,
    oneWay: oneWay,
    originLocationCode: originLocationCode,
    returnDate: returnDate,
    searching: searching,
    title: title,
  };

  const headerProps = {
    dispatch: dispatch,
    originLocationCode: originLocationCode,
    destinationLocationCode: destinationLocationCode,
    departureDate: departureDate,
    returnDate: returnDate,
    searching: searching,
    adults: adults,
    setOrder: setOrder,
    response: response,
  };

  return (
    <>
      {!searching && <SearchForm {...searchFormProps} />}
      {response.adults && <ResponseHeader {...headerProps} />}

      <ul className="Response-list">
        {typeof response?.data === 'string' && searching && (
          <Article className="Response-empty radius" title="oh...">
            {response.data}
            <input
              className="radius"
              type="submit"
              id="reset"
              onClick={(e) => {
                e.preventDefault();
                dispatch(A.switchBoolean({ name: 'searching', value: searching }));
              }}
            ></input>
          </Article>
        )}
        {response?.adults &&
          response?.data?.map((element) => (
            <ResponseFlight key={element.id} id={element.id} logged={logged} adults={adults} {...element} />
          ))}
      </ul>
    </>
  );
};
