import React, { useEffect } from 'react';
import * as A from '../../context/flight/Flight.actions';
import { useCounter } from '../../hooks/useCounter';
import { Input } from '../common/Input';

export const PassengerCounter = React.memo(({ adults, dispatch }) => {
  const { state: passengers, increment, decrement } = useCounter(adults);

  useEffect(() => {
    dispatch(A.setNumber({ name: 'adults', value: passengers }));
  }, [passengers, dispatch]);

  return (
    <fieldset className="SearchForm__passengers">
      <Input
        className="SearchForm__passengers-trigger"
        type="button"
        id="minus"
        value="-"
        onClick={() => {
          decrement();
        }}
      />
      <Input
        className="SearchForm__passengers-value "
        type="number"
        name="passengers"
        id="passengers"
        placeholder="1"
        onChange={() => dispatch(A.setNumber({ name: 'adults', value: passengers }))}
        value={passengers}
      />
      <Input
        className="SearchForm__passengers-trigger"
        type="button"
        id="plus"
        value="+"
        onClick={() => {
          increment();
        }}
      />
    </fieldset>
  );
});
