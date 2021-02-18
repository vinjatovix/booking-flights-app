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
    const cssStops = stopsButtonState
      ? 'Response-filter__stops filter active'
      : 'Response-filter__stops filter ';
    const payload = { cssDuration: cssDuration, cssPrice: cssPrice, cssStops: cssStops };
    // console.log(payload);
    // console.log(durationButtonState, stopsButtonState, priceButtonState);
    setFilter(payload);
  }, [durationButtonState, stopsButtonState, priceButtonState]);
  // useEffect(() => {
  //   const cssDuration = filter.duration
  //     ? 'Response-filter__duration filter active'
  //     : 'Response-filter__duration filter';
  //   const cssStops = filter.stops ? 'Response-filter__stops filter active' : 'Response-filter__stops filter';
  //   const cssPrice = filter.price ? 'Response-filter__price filter active' : 'Response-filter__price filter';
  //   setFilter({ cssDuration, cssPrice, cssStops });
  // }, [filter]);

  const salida = formatHeaderDate(departureDate);
  const llegada = formatHeaderDate(returnDate);

  console.log(filter.cssStops);
  return (
    <div className="Response-header">
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
          // onClick={() => setFilter({ duration: false, price: false, stops: true })}
          response={response}
          val={filter.stops}
        />
        <FilterButton
          className={filter.cssDuration}
          dispatch={dispatch}
          kind={'durationButtonState'}
          name="duration"
          orderMethod={byDuration}
          response={response}
          val={filter.duration}
        />
        <FilterButton
          className={filter.cssPrice}
          kind={'priceButtonState'}
          name="price"
          // onClick={({ target }) => setFilter()}
          val={filter.price}
          orderMethod={byPrice}
          setFilter={setFilter}
          dispatch={dispatch}
          response={response}
        />
      </ul>
      <ResponseDates salida={salida} llegada={llegada} adults={adults} />
    </div>
  );
};
