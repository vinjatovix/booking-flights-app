import React, { useEffect, useState } from 'react';

/* COMPONENTS */
import { Article } from '../common/Article';
import { PassengerCounter } from './PassengerCounter';

/* ACTIONS */
import * as A from '../../context/flight/Flight.actions';
import { createUrl } from './createUrl';

export const SearchForm = ({
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

  const url = createUrl({
    adults,
    departureDate,
    destinationLocationCode,
    endPoint,
    maxPrice,
    originLocationCode,
    returnDate,
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
    if (res.status !== 200) {
      setErrorMessage(data.details);
      setTimeout(() => setErrorMessage(''), 3000);
    } else {
      dispatch(A.switchBoolean({ name: 'searching', value: searching }));
      dispatch(A.saveResponse(data));
    }
  };
  useEffect(() => {}, [searching]);
  return (
    <Article title="Buscador" className="">
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
          onClick={(e) => dispatch(A.switchBoolean({ name: 'nonStop', value: nonStop }))}
        />
        <input
          className="SearchForm__price"
          type="number"
          name="price"
          id="price"
          placeholder="Max €"
          onChange={(e) => dispatch(A.setNumber({ name: 'maxPrice', value: e.target.value }))}
        />
        <input
          className="SearchForm__airport"
          type="text"
          name="origin"
          id="origin"
          placeholder="SCQ - Lavacolla"
          onChange={(e) =>
            dispatch(
              A.setString({
                name: 'originLocationCode',
                value: e.target.value,
              })
            )
          }
        />
        <input
          type="text"
          name="destination"
          id="destination"
          placeholder="FCO - Fiumiccino"
          onChange={(e) =>
            dispatch(
              A.setString({
                name: 'destinationLocationCode',
                value: e.target.value,
              })
            )
          }
        />
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
          {' '}
          {errorMessage}
        </div>

        <input type="submit" value="Buscar" />
      </form>
    </Article>
  );
};
