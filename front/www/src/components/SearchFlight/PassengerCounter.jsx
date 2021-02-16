import React, { useEffect } from 'react';
import * as A from '../../context/flight/Flight.actions';
import { useCounter } from '../../hooks/useCounter';
import { Input } from '../common/Input';

export const PassengerCounter = React.memo(({ adults, dispatch, r }) => {
  const { state: passengers, increment, decrement } = useCounter(adults);
  console.log('RENDER PASAJEROS');

  useEffect(() => {
    dispatch(A.setNumber({ name: 'adults', value: passengers }));
  }, [passengers, dispatch]);

  return (
    <fieldset className="SearchForm__passengers">
      <Input
        className="SearchForm__passengers-trigger radius"
        style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
        type="button"
        id="minus"
        value="-"
        onClick={() => {
          decrement();
        }}
      />
      <Input
        r={r}
        className="SearchForm__passengers-value"
        style={{ borderRadius: 0 }}
        type="number"
        name="adults"
        id="passengers"
        placeholder="1"
        onChange={() => dispatch(A.setNumber({ name: 'adults', value: passengers }))}
        onClick={(e) => e.preventDefault()}
        value={passengers}
      />
      <Input
        className="SearchForm__passengers-trigger radius"
        style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
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
