import React from 'react';

import PropTypes from 'prop-types';
import { Input } from '../Input';

export const InputList = React.memo(({ items, handleInputChange, reset }) => {
  return (
    <>
      {items.map((item) => {
        return <Input key={item.name} onChange={handleInputChange} onClick={reset} {...item} />;
      })}
    </>
  );
});
InputList.propTypes = {
  items: PropTypes.array.isRequired,
};
