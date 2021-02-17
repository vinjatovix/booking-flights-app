import React from 'react';
import { formatHeaderDate, monthName } from '../../../utils/dateUtils';

import './responseHeader.css';
import { FilterButton } from './FilterButton';
import { ResponseHeaderAirports } from './ResponseHeaderAirports';
import { ResponseDates } from './ResponseDates';

const formatDuration = (string) => {
  
  return;
};

const byStops = (a, b) => (a.itineraries[0].segments.length > b.itineraries[0].segments.length ? 1 : -1);

const byPrice = (a, b) => (+a.price.grandTotal > +b.price.grandTotal ? 1 : -1);

const byDuration = (a, b) => (+a.itineraries[0].duration < +b.itineraries[0].duration ? 1 : -1);

export const ResponseHeader = React.memo((props) => {
  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    setOrder,
    dispatch,
    searching,
    response,
    children,
  } = props;

  // const { data } = response;
  // if (data.length > 0) {
  //   const sto = data.sort(byStops);
  //   const pri = data.sort(byPrice);
  //   const dur = data.sort(byDuration);
  //   console.log('par pre');
  //   console.log('par', sto);
  //   console.log('pre', pri);
  //   console.log('dur', dur);

  //   // console.dir(data.sort(byStops()));
  // }

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
          orderMethod={byPrice}
          response={response}
        />
        <FilterButton
          className="Response-filter__price filter active reverse"
          orderMethod={byDuration}
          dispatch={dispatch}
          response={response}
        />
      </ul>
      <ResponseDates salida={salida} llegada={llegada} adults={adults} />
    </div>
  );
});
