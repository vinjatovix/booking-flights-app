import React from 'react';
import { setOrder } from '../../../context/flight/Flight.actions';

export const FilterButton = ({ orderMethod, className, children, response = [], dispatch }) => {
  const { adults, data } = response;
  return (
    <li
      className={className}
      onClick={() => {
        console.log(data.sort(orderMethod));
        // console.log(data.itineraries[0].duration);
        console.log(data[0].itineraries[0].duration.replace('PT','').replace('M','').split('H'));
        dispatch(setOrder({ adults: adults, data: data.sort(setOrder) }));
      }}
    >
      {children}
    </li>
  );
};
