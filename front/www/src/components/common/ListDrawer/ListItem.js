import React from 'react';
import PropTypes from 'prop-types';

/** */
export const ListItem = ({ name, children }) => {
  if (!name && !children) {
    return <li>Faltan props</li>;
  }
  if (name && children) {
    return (
      <li>
        {name}: {children}
      </li>
    );
  }
  if (!children) {
    return <li>{name}</li>;
  }
  return <li>{children}</li>;
};

ListItem.propTypes = {
  children: PropTypes.any,
  name: PropTypes.any,
};
