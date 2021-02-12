import React from 'react';
import PropTypes from 'prop-types';

export const Input = React.memo(({ id, name, placeholder, required, type, value, setValue, ...item }) => {
  return (
    <input
      id={id}
      key={id}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      {...item}
    />
  );
});
Input.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  placeholder: 'placeholder',
  required: null,
};
