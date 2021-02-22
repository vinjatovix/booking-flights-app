import React from 'react';
import { useFlightContext } from '../../../context/flight/Flight.context';
import { formatHeaderDate } from '../../../utils/dateUtils';

export const ResponseDates = () => {
  const [{ adults, departureDate, returnDate }] = useFlightContext();
  const salida = formatHeaderDate(departureDate);
  const llegada = formatHeaderDate(returnDate);

  return (
    <ul className="Response__dates">
      <li>{salida}</li>
      {llegada !== 'NaNEne' && (
        <>
          <li>-</li>
          <li>{llegada}</li>
        </>
      )}
      <li>{adults} px</li>
    </ul>
  );
};
