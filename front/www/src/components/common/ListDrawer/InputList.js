import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';
import { Input } from './Input';

export const InputList = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return <Input key={uuidv4()} {...item} />;
      })}
    </>
  );
};
InputList.propTypes = {
  items: PropTypes.array.isRequired,
};
