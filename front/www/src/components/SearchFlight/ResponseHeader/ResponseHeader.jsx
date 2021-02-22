import React, { useEffect, useState } from 'react';

import './responseHeader.css';
import { FilterButton } from './FilterButton';
import { ResponseHeaderAirports } from './ResponseHeaderAirports';
import { ResponseDates } from './ResponseDates';
import { byStops, byDuration, byPrice } from './filters';
import { useFlightContext } from '../../../context/flight/Flight.context';

export const ResponseHeader = () => {
  const [{ durationButtonState, stopsButtonState, priceButtonState }] = useFlightContext();

  const [filter, setFilter] = useState({
    cssDuration: 'Response-filter__duration filter',
    cssPrice: 'Response-filter__price filter',
    cssStops: 'Response-filter__stops filter ',
  });

  useEffect(() => {
    const cssDuration = setCssDuration(durationButtonState);
    const cssPrice = setCssPrice(priceButtonState);
    const cssStops = setCssStops(stopsButtonState);
    const payload = { cssDuration: cssDuration, cssPrice: cssPrice, cssStops: cssStops };
    setFilter(payload);
  }, [durationButtonState, stopsButtonState, priceButtonState]);

  const filters = [
    {
      className: filter.cssStops,
      kind: 'stopsButtonState',
      name: 'stops',
      orderMethod: byStops,
      setFilter: setFilter,
      val: filter.stops,
    },
    {
      className: filter.cssDuration,
      kind: 'durationButtonState',
      name: 'duration',
      orderMethod: byDuration,
      setFilter: setFilter,
      val: filter.duration,
    },
    {
      className: filter.cssPrice,
      kind: 'priceButtonState',
      name: 'price',
      orderMethod: byPrice,
      setFilter: setFilter,
      val: filter.price,
    },
  ];

  return (
    <div className="Response-header">
      <ResponseHeaderAirports />
      <ul className="Response__filters">
        {filters.map((props) => (
          <FilterButton key={props.name} {...props} />
        ))}
      </ul>
      <ResponseDates />
    </div>
  );
};

function setCssStops(stopsButtonState) {
  return stopsButtonState ? 'Response-filter__stops filter active' : 'Response-filter__stops filter ';
}

function setCssPrice(priceButtonState) {
  return priceButtonState ? 'Response-filter__price filter active' : 'Response-filter__price filter';
}

function setCssDuration(durationButtonState) {
  return durationButtonState ? 'Response-filter__duration filter active' : 'Response-filter__duration filter';
}
