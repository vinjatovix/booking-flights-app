import React, { useEffect, useRef, useState } from 'react';

/* COMPONENTS */
import { AirportSelector } from './AirportSelector';
import { Article } from '../common/Article';
import { Dates } from './ResponseHeader/SearchForm/Dates';
import { ErrorMessage } from '../common/ErrorMessage';
import { Input } from '../common/Input';
import { Loading } from '../common/Loading/Loading';
import { PassengerCounter } from './PassengerCounter';

/* ACTIONS */
import * as A from '../../context/flight/Flight.actions';
import { createUrl } from './createUrl';

import './searchForm.css';
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
    dispatch(A.saveResponse({}));
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
      dispatch(A.setString({ name: 'returnDate', value: null }));
    }
    dispatch(A.setFlightQuestion(data));
    const url = createUrl({
      adults: adults || 1,
      departureDate,
      destinationLocationCode,
      endPoint: endPoint,
      maxPrice: maxPrice || 9999,
      originLocationCode,
      returnDate: returnDate || '',
      nonStop: nonStop === 'Directo',
    });
    // dispatch(A.switchBoolean({ name: 'loading', value: loading }));

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

  const tripProps = {
    r: register,
    className: 'SearchForm__trip radius',
    type: 'button',
    name: 'oneWay',
    id: 'trip',
    value: tripValue,
    onClick: resetReturnDate(dispatch, oneWay),
  };
  const passengerProps = {
    r: register,
    dispatch: dispatch,
    adults: adults,
  };
  const nonStopProps = {
    r: register,
    className: 'SearchForm__nonStop radius',
    type: 'button',
    name: 'nonStop',
    id: 'escales',
    value: stopsValue,
    onClick: () => dispatch(A.switchBoolean({ name: 'nonStop', value: nonStop })),
  };
  const priceProps = {
    r: register,
    className: 'SearchForm__price radius',
    type: 'number',
    name: 'maxPrice',
    id: 'price',
    placeholder: 'Max €',
    // value: +maxPrice,
    handler: (e) => dispatch(A.setNumber({ name: 'maxPrice', value: e.target.value })),
  };
  const originAirportProps = {
    r: register,
    placeholder: 'Compostela',
    name: 'originLocationCode',
    value: originLocationCode,
    dispatch: dispatch,
  };
  const destinationAirportProps = {
    r: register,
    placeholder: 'London',
    name: 'destinationLocationCode',
    value: destinationLocationCode,
    dispatch: dispatch,
  };
  const datesProps = {
    r: register,
    className: 'SearchForm__dates',
    departureDate: departureDate,
    returnDate: returnDate,
    dispatch: dispatch,
    oneWay: oneWay,
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
        <Input {...tripProps} />
        <PassengerCounter {...passengerProps} />
        <Input {...nonStopProps} />
        <Input {...priceProps} />
        <AirportSelector {...originAirportProps} />
        <AirportSelector {...destinationAirportProps} />
        <Dates {...datesProps} />

        {!searching && !loading ? (
          <Input className="radius" id="submit-button" type="submit" value="Buscar" />
        ) : (
          <Loading />
        )}
      </form>
      <ErrorMessage children={errorMessage} />
    </Article>
  );
};
