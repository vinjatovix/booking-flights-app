import React from 'react';
import * as A from '../../../context/Auth.actions';

export const GetBooking = ({ props }) => {
  const { dispatch, modal } = props;
  return (
    <>
      <header>
        <section>
          <p>FL</p>
          <p>0.6</p>
        </section>
        <section>
          <p>ID: 9823758</p>
        </section>
      </header>
    </>
  );
};
