import React from 'react';


export const FilterButton = ({ setOrder, className, children, response }) => {
  return (
    <li
      className={className}
      onClick={() => {
        console.log(response.sort());
        setOrder('paradas');
      }}
    >
      {children}
    </li>
  );
};
