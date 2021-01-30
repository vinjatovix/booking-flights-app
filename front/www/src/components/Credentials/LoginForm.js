import React from 'react';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';
import './credentials.css';
import PropTypes from 'prop-types';

export const LoginForm = ({ action, cssClassName, encType, inputs, method }) => {
  //TODO: state para el auth, email, etc... probablemente custom hook
  const logIn = (e) => {
    e.preventDefault();
    console.log(e); //TODO: gestionar submit
  };
  return (
    <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={logIn}>
      <ListDrawer type="inputs" items={inputs} />
    </form>
  );
};

LoginForm.propTypes = {
  action: PropTypes.string.isRequired,
  cssClassName: PropTypes.string,
  encType: PropTypes.string,
  inputs: PropTypes.array.isRequired,
  method: PropTypes.string.isRequired,
};
LoginForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
