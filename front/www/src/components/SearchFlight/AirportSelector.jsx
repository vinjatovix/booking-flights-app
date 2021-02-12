import React from 'react';
import { v4 as uuid } from 'uuid';
import * as A from '../../context/flight/Flight.actions';

export const AirportSelector = ({ name, value, handler, seed, dispatcher, placeholder }) => {
  return (
    <fieldset className="SearchForm__airport" id={name}>
      <input
        className="radius"
        type="text"
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => handler(e.target.value.toUpperCase())}
        onClick={() => handler('')}
        required="required"
      />
      {value && (
        <ul className="SearchForm__suggestion">
          {seed.map((val) => (
            <li
              key={uuid()}
              code={val.value.toUpperCase()}
              onClick={() => {
                handler(val.name);
                dispatcher(
                  A.setString({
                    name: `${name}`,
                    value: `${val.value.toUpperCase()}`,
                  })
                );
              }}
            >
              {val.value} - {val.name}
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
};
