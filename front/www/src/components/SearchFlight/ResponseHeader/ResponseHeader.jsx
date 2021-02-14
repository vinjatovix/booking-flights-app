import React, { Children } from 'react';
import { monthName } from '../../../utils/dateUtils';
import * as A from '../../../context/flight/Flight.actions';

import './responseHeader.css';

export const FilterButton = ({ setOrder, className, children }) => {
  return (
    <li
      className={className}
      onClick={() => {
        console.log('duracion');
        setOrder('duration');
      }}
    >
      {children}
    </li>
  );
};

export const ResponseHeader = React.memo(
  ({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    setOrder,
    dispatch,
    searching,
  }) => {
    const dd = new Date(departureDate);
    const salida = `${dd.getDate()}${monthName(dd.getMonth())}`;
    const rd = new Date(returnDate);
    const llegada = `${rd.getDate()}${monthName(rd.getMonth())}`;
    return (
      <div className="Response-header" style={{ marginTop: '1rem' }}>
        <ul className="Response__airports">
          <li
            className="pencil-icon"
            onClick={() => {
              dispatch(A.switchBoolean({ name: 'searching', value: searching }));
            }}
          ></li>
          <li>{originLocationCode}</li>
          <li className="roundTrip-icon"></li>
          <li>{destinationLocationCode}</li>
        </ul>
        <ul className="Response__filters">
          <FilterButton className="Response-filter__stops filter active sort" />
          <FilterButton className="Response-filter__duration filter" />
          <FilterButton className="Response-filter__price filter active reverse" />
        </ul>
        <ul className="Response__dates">
          <li>{salida}</li>
          {llegada !== 'NaNEne' && <li>{llegada}</li>}
          <li>{adults} px</li>
        </ul>
      </div>
    );
  }
);
