import React, { useEffect, useRef, useState } from 'react';

/* COMPONENTS */
import { Article } from '../common/Article';
import { PassengerCounter } from './PassengerCounter';

/* ACTIONS */
import * as A from '../../context/flight/Flight.actions';
import { createUrl } from './createUrl';

import { useAutocomplete } from '../../hooks/useAutocomplete';

import { airports } from '../../utils/airports.json';
import { AirportSelector } from './AirportSelector';

const seed = airports.map((element, i) => ({ id: i, name: element.Loca_nombre, value: element.Aero_iata }));

export const SearchForm = React.memo(
  ({
    title,
    adults,
    departureDate,
    destinationLocationCode,
    dispatch,
    endPoint,
    loading,
    maxPrice,
    nonStop,
    oneWay,
    originLocationCode,
    returnDate,
    searching,
  }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [a1, setA1] = useState(originLocationCode);
    const [a2, setA2] = useState(destinationLocationCode);
    const [airports1] = useAutocomplete(a1, seed);
    const [airports2] = useAutocomplete(a2, seed);

    const isMounted = useRef(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);
    useEffect(() => {}, [searching, originLocationCode]);

    const url = createUrl({
      adults,
      departureDate,
      destinationLocationCode,
      endPoint,
      maxPrice,
      originLocationCode,
      returnDate,
      nonStop,
    });

    const handlerSubmit = async (e) => {
      e.preventDefault();

      if (oneWay) {
        dispatch(A.setString({ name: 'returnDate', value: '' }));
      }

      dispatch(A.switchBoolean({ name: 'loading', value: loading }));
      const res = await fetch(url, {
        method: 'GET',
      });
      const data = await res.json();
      if (isMounted.current) {
        if (res.status !== 200) {
          setErrorMessage(data.details);
          setTimeout(() => setErrorMessage(''), 3000);
        } else {
          dispatch(A.switchBoolean({ name: 'searching', value: searching }));
          dispatch(A.saveResponse(data));
        }
      }
    };
    return (
      <Article title={title} className="">
        <form className="SearchForm" method="GET" encType="multipart/form-data" onSubmit={handlerSubmit}>
          <input
            className="SearchForm__trip"
            type="button"
            name="trip"
            id="trip"
            value={oneWay ? 'Solo ida' : 'I/V'}
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'oneWay', value: oneWay }));
              dispatch(A.setString({ name: 'returnDate', value: '' }));
            }}
          />
          <PassengerCounter adults={adults} dispatch={dispatch} />

          <input
            className="SearchForm__nonStop"
            type="button"
            name="escales"
            id="escales"
            value={nonStop ? 'Directo' : 'Todos'}
            onClick={() => dispatch(A.switchBoolean({ name: 'nonStop', value: nonStop }))}
          />
          <input
            className="SearchForm__price"
            type="number"
            name="price"
            id="price"
            placeholder="Max €"
            onChange={(e) => dispatch(A.setNumber({ name: 'maxPrice', value: e.target.value }))}
          />

          <AirportSelector name="origin" value={a1} handler={setA1} seed={airports1} dispatcher={dispatch} />
          <AirportSelector name="destination" value={a2} handler={setA2} seed={airports2} dispatcher={dispatch} />

          <fieldset className="SearchForm__dates">
            <input
              type="date"
              name="departureDate"
              id="departureDate"
              onChange={(e) => dispatch(A.setString({ name: 'departureDate', value: e.target.value }))}
            />
            {!oneWay && (
              <input
                type="date"
                name="returnDate"
                id="returnDate"
                onChange={(e) => dispatch(A.setString({ name: 'returnDate', value: e.target.value }))}
              />
            )}
          </fieldset>
          <div className="SearchForm__error" style={{ display: 'block', color: 'red', minHeight: '1.5em' }}>
            {errorMessage}
          </div>

          <input id="search" type="submit" value="Buscar" />
        </form>
      </Article>
    );
  }
);
