import React from 'react';
import { formatHeaderDate } from '../../../utils/dateUtils';

import './responseHeader.css';
import { FilterButton } from './FilterButton';
import { ResponseHeaderAirports } from './ResponseHeaderAirports';
import { ResponseDates } from './ResponseDates';
import { byStops, byDuration, byPrice } from './filters';

export const ResponseHeader = React.memo((props) => {
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


  const salida = formatHeaderDate(departureDate);
  const llegada = formatHeaderDate(returnDate);

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
          className="Response-filter__stops filter active sort"
          orderMethod={byStops}
          dispatch={dispatch}
          response={response}
        />
        <FilterButton
          className="Response-filter__duration filter"
          dispatch={dispatch}
          orderMethod={byDuration}
          response={response}
        />
        <FilterButton
          className="Response-filter__price filter active reverse"
          orderMethod={byPrice}
          dispatch={dispatch}
          response={response}
        />
      </ul>
      <ResponseDates salida={salida} llegada={llegada} adults={adults} />
    </div>
  );
});
