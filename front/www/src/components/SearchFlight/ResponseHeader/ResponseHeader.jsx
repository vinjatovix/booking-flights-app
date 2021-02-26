import React, { useEffect, useState } from 'react';
import { formatHeaderDate } from '../../../utils/dateUtils';

import './responseHeader.css';
import { FilterButton } from './FilterButton';
import { ResponseHeaderAirports } from './ResponseHeaderAirports';
import { ResponseDates } from './ResponseDates';
import { byStops, byDuration, byPrice } from './filters';
import { useFlightContext } from '../../../context/flight/Flight.context';

export const ResponseHeader = (props) => {
  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    dispatch,
    searching,
    response,
    children,
  } = props;
  const [{ durationButtonState, stopsButtonState, priceButtonState }] = useFlightContext();

  const [filter, setFilter] = useState({
    cssDuration: 'Response-filter__duration filter',
    cssPrice: 'Response-filter__price filter',
    cssStops: 'Response-filter__stops filter ',
  });

  useEffect(() => {
    const cssDuration = durationButtonState
      ? 'Response-filter__duration filter active'
      : 'Response-filter__duration filter';
    const cssPrice = priceButtonState ? 'Response-filter__price filter active' : 'Response-filter__price filter';
    const cssStops = stopsButtonState ? 'Response-filter__stops filter active' : 'Response-filter__stops filter ';
    const payload = { cssDuration: cssDuration, cssPrice: cssPrice, cssStops: cssStops };
    setFilter(payload);
  }, [durationButtonState, stopsButtonState, priceButtonState]);


  const salida = formatHeaderDate(departureDate);
  const llegada = formatHeaderDate(returnDate);

  return (
    <div className="Response-header animate__animated animate__fadeInDown">
      {children}
      <ResponseHeaderAirports
        originLocationCode={originLocationCode}
        destinationLocationCode={destinationLocationCode}
        dispatch={dispatch}
        searching={searching}
      />
      <ul className="Response__filters">
        <FilterButton
          className={filter.cssStops}
          dispatch={dispatch}
          kind={'stopsButtonState'}
          name="stops"
          orderMethod={byStops}
          response={response}
          setFilter={setFilter}
          val={filter.stops}
        />
        <FilterButton
          className={filter.cssDuration}
          dispatch={dispatch}
          kind={'durationButtonState'}
          name="duration"
          orderMethod={byDuration}
          response={response}
          setFilter={setFilter}
          val={filter.duration}
        />
        <FilterButton
          className={filter.cssPrice}
          dispatch={dispatch}
          kind={'priceButtonState'}
          name="price"
          // onClick={({ target }) => setFilter()}
          orderMethod={byPrice}
          response={response}
          setFilter={setFilter}
          val={filter.price}
        />
      </ul>
      <ResponseDates salida={salida} llegada={llegada} adults={adults} />
    </div>
  );
};
