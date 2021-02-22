import React, { useEffect, useRef, useState } from 'react';

/* COMPONENTS */
import { AirportSelector } from './AirportSelector';
import { Article, ErrorMessage, Form, Input, Loading } from '../../common/index';
import { Dates } from '../ResponseHeader/SearchForm/Dates';
import { PassengerCounter } from './PassengerCounter';

/* ACTIONS */
import * as F from '../../../context/flight/Flight.actions';
import { makeSearch } from './makeSearch';
import { resetReturnDate } from './resetReturnDate';

/* HOOKS */
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../../context/auth/Auth.context';
import { useFlightContext } from '../../../context/flight/Flight.context';
import './searchForm.css';

//* ######################################## RAFC ##############################################
export const SearchForm = React.memo(({ title, endPoint }) => {
  //? CONTEXTOS
  const [{ menu }] = useAuthContext();
  const [
    { departureDate, destinationLocationCode, loading, nonStop, oneWay, originLocationCode, returnDate, searching },
    dispatch,
  ] = useFlightContext();

  //? ESTADOS
  const { register, handleSubmit } = useForm();
  const [css, setCss] = useState('radius focus');
  const [errorMessage, setErrorMessage] = useState('');

  //? EFECTOS
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [oneWay, nonStop]);
  useEffect(() => {
    menu ? setCss('radius blur') : setCss('radius focus');
  }, [menu]);

  useEffect(() => {
    loading ? setCss((c) => c.trim() + ' Loading') : setCss((c) => c.replace('Loading', ''));
  }, [loading]);

  const tripValue = oneWay ? 'Solo ida' : 'I/V';
  const stopsValue = nonStop ? 'Directo' : 'Todos';

  const onSubmit = async (data) => {
    await makeSearch({ dispatch, data, endPoint, isMounted, loading, setErrorMessage, searching });
  };

  const tripProps = {
    className: 'SearchForm__trip radius',
    id: 'trip',
    name: 'oneWay',
    onClick: resetReturnDate(dispatch, oneWay),
    r: register,
    type: 'button',
    value: tripValue,
  };

  const nonStopProps = {
    className: 'SearchForm__nonStop radius',
    id: 'escales',
    name: 'nonStop',
    onClick: () => dispatch(F.switchBoolean({ name: 'nonStop', value: nonStop })),
    r: register,
    type: 'button',
    value: stopsValue,
  };
  const priceProps = {
    className: 'SearchForm__price radius',
    handler: (e) => dispatch(F.setNumber({ name: 'maxPrice', value: e.target.value })),
    id: 'price',
    name: 'maxPrice',
    placeholder: 'Max €',
    r: register,
    type: 'number',
  };
  const originAirportProps = {
    name: 'originLocationCode',
    placeholder: 'Compostela',
    r: register,
    value: originLocationCode,
  };
  const destinationAirportProps = {
    name: 'destinationLocationCode',
    placeholder: 'London',
    r: register,
    value: destinationLocationCode,
  };
  const datesProps = {
    className: 'SearchForm__dates',
    departureDate: departureDate,
    dispatch: dispatch,
    oneWay: oneWay,
    r: register,
    returnDate: returnDate,
  };
  //* ################################# RETURN ##########################
  return (
    <Article title={title} className={css}>
      <Form className="SearchForm" endpoint={endPoint} handler={handleSubmit(onSubmit)}>
        <Input {...tripProps} />
        <PassengerCounter r={register} />
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
      </Form>
      <ErrorMessage children={errorMessage} />
    </Article>
  );
});
