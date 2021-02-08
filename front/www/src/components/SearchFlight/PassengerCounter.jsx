import React, { useEffect } from 'react';
import * as A from '../../context/flight/Flight.actions';
import { useCounter } from '../../hooks/useCounter';

export const PassengerCounter = ({ adults, dispatch }) => {
  const { state: passengers, increment, decrement } = useCounter(adults);

  useEffect(() => {
    dispatch(A.setNumber({ name: 'adults', value: passengers }));
  }, [passengers, dispatch]);

  return (
    <fieldset className="SearchForm__passengers">
      <input
        className="SearchForm__passengers-trigger"
        type="button"
        value="-"
        onClick={() => {
          decrement();
        }}
      />
      <input
        className="SearchForm__passengers-value "
        type="number"
        name="passengers"
        id="passengers"
        placeholder="1"
        onChange={() => dispatch(A.setNumber({ name: 'adults', value: passengers }))}
        value={passengers}
      />
      <input
        className="SearchForm__passengers-trigger"
        type="button"
        value="+"
        onClick={() => {
          increment();
        }}
      />
    </fieldset>
  );
};
