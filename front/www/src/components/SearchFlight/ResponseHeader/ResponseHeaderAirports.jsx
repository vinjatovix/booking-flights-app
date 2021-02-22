import React from 'react';
import * as A from '../../../context/flight/Flight.actions';
import { useFlightContext } from '../../../context/flight/Flight.context';

export const ResponseHeaderAirports = () => {
  const [{ originLocationCode, destinationLocationCode, searching }, dispatch] = useFlightContext();
  return (
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
  );
};
