import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ id, name, placeholder, required, type, value, setValue, ...item }) => {
  return (
    <input
      id={id}
      key={id}
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...item}
    />
  );
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
};
Input.defaultProps = {
  type: 'text',
  placeholder: 'placeholder',
  required: null,
};
