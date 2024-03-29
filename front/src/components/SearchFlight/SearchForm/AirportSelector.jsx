import React from "react";

import { Input } from "../../common/Input";

import { airports } from "../../../utils/airports.json";

const seed = airports.map((element, i) => ({
  id: i,
  name: element.Loca_nombre,
  value: element.Aero_iata,
}));

export const AirportSelector = React.memo(({ name, value, placeholder, r }) => {
  const inputProps = {
    r: r,
    defaultValue: value,
    list: "air",
    className: "radius",
    name: name,
    placeholder: placeholder,
    autoComplete: "off",
    required: "required",
  };

  return (
    <fieldset className="SearchForm__airport" id={name}>
      <label>
        {name.includes("origin") ? "Origen" : "Destino"}
        <Input
          list="air"
          {...inputProps}
          onFocus={(e) => (e.target.value = "")}
        />
      </label>
      <datalist id="air">
        {seed.map((e) => (
          <option
            key={e.value}
            value={e.value}
          >{`${e.value} - ${e.name}`}</option>
        ))}
      </datalist>
    </fieldset>
  );
});
