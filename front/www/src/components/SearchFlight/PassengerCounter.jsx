import React from 'react';
import * as A from '../../context/flight/Flight.actions';

export const PassengerCounter = ({ adults, dispatch }) => {
  return (
    <fieldset className="SearchForm__passengers">
      <input className="SearchForm__passengers-trigger" type="button" value="-" />
      <input
        className="SearchForm__passengers-value "
        type="number"
        name="passengers"
        id="passengers"
        placeholder="1"
        onChange={(e) => dispatch(A.setNumber({ name: 'adults', value: e.target.value }))}
        value={adults} />
      <input className="SearchForm__passengers-trigger" type="button" value="+" />
    </fieldset>
  );
};
