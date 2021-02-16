import React from 'react';
// import { v4 as uuid } from 'uuid';
// import * as A from '../../context/flight/Flight.actions';
// import { useAutocomplete } from '../../hooks/useAutocomplete';

import { airports } from '../../utils/airports.json';
import { Input } from '../common/Input';

const seed = airports.map((element, i) => ({ id: i, name: element.Loca_nombre, value: element.Aero_iata }));

export const AirportSelector = React.memo(({ name, value, handler, dispatch, placeholder, r }) => {
  console.log('RENDER', name);
  const inputProps = {
    r: r,
    defaultValue: value,
    list: 'air',
    className: 'radius',
    name: name,
    placeholder: placeholder,
    autoComplete: 'off',
    required: 'required',
  };

  return (
    <fieldset className="SearchForm__airport" id={name}>
      <label>
        {name.includes('origin') ? 'Origen' : 'Destino'}
        <Input list="air" {...inputProps} onFocus={(e) => (e.target.value = '')} />
      </label>
      <datalist id="air">
        {seed.map((e) => (
          <option key={e.value} value={e.value}>{`${e.value} - ${e.name}`}</option>
        ))}
      </datalist>
    </fieldset>
  );
});
