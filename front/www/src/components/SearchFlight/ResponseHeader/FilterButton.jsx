import React, { useEffect, useState } from 'react';
import { setOrder, setFilterOn } from '../../../context/flight/Flight.actions';
import { useFlightContext } from '../../../context/flight/Flight.context';

export const FilterButton = ({ setFilter, kind, val, orderMethod, className, children }) => {
  const [{ adults, response }, dispatch] = useFlightContext();
  const { data } = response;
  const [on, setOn] = useState(className.includes('active'));
  const [newData, setNewData] = useState(data);
  useEffect(() => {
    setNewData(data.sort(orderMethod));
  }, [data, orderMethod]);
  useEffect(() => {
    const newResponse = on ? data.sort(orderMethod) : data.sort(orderMethod).reverse();
    setNewData(newResponse);
  }, [className, on, data, newData, orderMethod]);
  return (
    <li
      className={className}
      onClick={(e) => {
        setOn(!on);
        dispatch(setFilterOn({ name: kind, value: true }));
        dispatch(setOrder({ adults: adults, data: newData }));
      }}
    >
      {children}
    </li>
  );
};
