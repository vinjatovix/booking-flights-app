import React from 'react';
import { monthName } from '../../utils/dateUtils';

export const ResponseHeader = ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  setOrder,
}) => {
  const dd = new Date(departureDate);
  const salida = `${dd.getDate()}${monthName(dd.getMonth())}`;
  const rd = new Date(returnDate);
  const llegada = `${rd.getDate()}${monthName(rd.getMonth())}`;
  return (
    <div className="Response-header" style={{ marginTop: '1rem' }}>
      <ul className="Response__airports">
        <li>{originLocationCode}</li>
        <li className="roundTrip-icon"></li>
        <li>{destinationLocationCode}</li>
        <li className="pencil-icon"></li>
      </ul>
      <ul className="Response__filters">
        <li className="Response-filter__stops filter active sort">P</li>
        <li className="Response-filter__duration filter">
          <button onClick={() => setOrder('duration')}>ord</button>
        </li>
        <li className="Response-filter__price filter active reverse">$</li>
      </ul>
      <ul className="Response__dates">
        <li>{salida}</li>
        {llegada && <li>{llegada}</li>}
        <li>{adults} px</li>
      </ul>
    </div>
  );
};
