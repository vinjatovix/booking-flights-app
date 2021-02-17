import React, { useState } from 'react';
import { setOrder } from '../../../context/flight/Flight.actions';

export const FilterButton = ({ orderMethod, className, children, response = [], dispatch }) => {
  const { adults, data } = response;
  const [on, setOn] = useState(false);

  const action = on ? data.sort(orderMethod) : data.sort(orderMethod).reverse();
  return (
    <li
      className={className}
      onClick={() => {
        setOn(!on);
        dispatch(setOrder({ adults: adults, data: action }));
      }}
    >
      {children}
    </li>
  );
};
