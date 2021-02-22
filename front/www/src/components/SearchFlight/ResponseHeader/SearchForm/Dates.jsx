import React from 'react';
import { Input } from '../../../common/Input';
import * as A from '../../../../context/flight/Flight.actions.js';

export const Dates = React.memo(({ r, departureDate, returnDate, dispatch, oneWay }) => {
  const commonDateProps = {
    r: r,
    type: 'date',
    onChange: ({ target }) => dispatch(A.setString({ name: target.name, value: target.value })),
  };

  const departureDateProps = {
    r: r,
    className: 'SearchForm__dates-departure radius',
    type: 'date',
    name: 'departureDate',
    id: 'departureDate',
    value: departureDate,
    onChange: (e) => dispatch(A.setString({ name: 'departureDate', value: e.target.value })),
    required: 'required',
    ...commonDateProps,
  };

  const returnDateProps = {
    r: r,
    className: 'SearchForm__dates-return radius',
    type: 'date',
    name: 'returnDate',
    id: 'returnDate',
    value: returnDate,
    onChange: (e) => dispatch(A.setString({ name: 'returnDate', value: e.target.value })),
    ...commonDateProps,
  };

  return (
    <fieldset className="SearchForm__dates">
      <Input {...departureDateProps} />
      {!oneWay && <Input {...returnDateProps} />}
    </fieldset>
  );
});
