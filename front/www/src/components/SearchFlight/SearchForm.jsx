import React, { useEffect, useRef, useState } from 'react';

/* COMPONENTS */
import { Article } from '../common/Article';
import { PassengerCounter } from './PassengerCounter';

/* ACTIONS */
import * as A from '../../context/flight/Flight.actions';
import { createUrl } from './createUrl';

import { AirportSelector } from './AirportSelector';
import { ErrorMessage } from '../common/ErrorMessage';
import { Input } from '../common/Input';

import './searchForm.css';
import { Loading } from '../common/Loading/Loading';
import { useForm } from 'react-hook-form';
import { resetReturnDate } from './resetReturnDate';

export const SearchForm = ({
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
  menu,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [css, setCss] = useState('radius focus');
  useEffect(() => {}, [searching]);
  useEffect(() => {
    menu ? setCss('radius blur') : setCss('radius focus');
  }, [menu]);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    loading ? setCss((c) => c.trim() + ' Loading') : setCss((c) => c.replace('Loading', ''));
  }, [loading]);

  const { register, handleSubmit } = useForm();

  const tripValue = oneWay ? 'Solo ida' : 'I/V';
  const stopsValue = nonStop ? 'Directo' : 'Todos';

  const onSubmit = async (data) => {
    const {
      adults,
      departureDate,
      destinationLocationCode,
      originLocationCode,
      maxPrice,
      returnDate,
      nonStop,
      oneWay,
    } = data;
    if (oneWay === 'Solo ida') {
      dispatch(A.setString({ name: 'returnDate', value: '' }));
    }
    dispatch(A.setFlightQuestion(data));
    const url = createUrl({
      adults,
      departureDate,
      destinationLocationCode,
      endPoint: endPoint,
      maxPrice,
      originLocationCode,
      returnDate: oneWay === 'Solo Ida' ? '' : returnDate,
      nonStop: nonStop === 'Directo',
    });
    dispatch(A.switchBoolean({ name: 'loading', value: loading }));
    const res = await fetch(url, {
      method: 'GET',
    });
    const loot = await res.json();
    if (isMounted.current) {
      if (res.status !== 200) {
        dispatch(A.switchBoolean({ name: 'loading', value: !loading }));

        setErrorMessage(loot.details);
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        dispatch(A.switchBoolean({ name: 'searching', value: searching }));
        dispatch(A.saveResponse(loot));
      }
    }
  };

  return (
    <Article title={title} className={css}>
      <form
        className="SearchForm"
        method="GET"
        endpoint={endPoint}
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          ref={register}
          className="SearchForm__trip radius"
          type="button"
          name="oneWay"
          id="trip"
          value={tripValue}
          onClick={resetReturnDate(dispatch, oneWay)}
        />
        <PassengerCounter r={register} adults={adults} dispatch={dispatch} />
        <input
          ref={register}
          className="SearchForm__nonStop radius"
          type="button"
          name="nonStop"
          id="escales"
          value={stopsValue}
          onClick={() => dispatch(A.switchBoolean({ name: 'nonStop', value: nonStop }))}
        />
        <input
          ref={register}
          className="SearchForm__price radius"
          type="number"
          name="price"
          id="price"
          placeholder="Max €"
          onClick={(e) => e.preventDefault()}
          onChange={(e) => dispatch(A.setNumber({ name: 'maxPrice', value: e.target.value }))}
        />

        <AirportSelector placeholder="Compostela" name="originLocationCode" dispatch={dispatch} r={register} />

        <AirportSelector placeholder="London" name="destinationLocationCode" dispatch={dispatch} r={register} />

        <fieldset className="SearchForm__dates">
          <input
            ref={register}
            className="radius"
            type="date"
            name="departureDate"
            id="departureDate"
            onChange={(e) => dispatch(A.setString({ name: 'departureDate', value: e.target.value }))}
            required="required"
          />
          {!oneWay && (
            <input
              ref={register}
              className="radius"
              type="date"
              name="returnDate"
              id="returnDate"
              onChange={(e) => dispatch(A.setString({ name: 'returnDate', value: e.target.value }))}
            />
          )}
        </fieldset>
        {!searching && !loading ? (
          <Input className="button radius" id="submit-button" type="submit" value="Buscar" />
        ) : (
          <Loading />
        )}
      </form>
      <ErrorMessage children={errorMessage} />
    </Article>
  );
};
