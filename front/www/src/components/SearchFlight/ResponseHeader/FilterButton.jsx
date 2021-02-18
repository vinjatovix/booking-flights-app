import React, { useEffect, useState } from 'react';
import { setOrder, setFilterOn } from '../../../context/flight/Flight.actions';

export const FilterButton = ({ setFilter, kind, val, orderMethod, className, children, response = [], dispatch }) => {
  const { adults, data } = response;
  const [on, setOn] = useState(false);
  useEffect(() => {
    console.log(className);
  }, [className]);
  const action = on ? data.sort(orderMethod) : data.sort(orderMethod).reverse();
  return (
    <li
      kind={kind}
      className={className}
      onClick={() => {
        console.log(kind, val);
        setOn(!on);
        dispatch(setFilterOn({ name: kind, value: true }));
        dispatch(setOrder({ adults: adults, data: action }));
      }}
    >
      {children}
    </li>
  );
};
