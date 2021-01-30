import React from 'react';
import { ListDrawer } from '../common/ListDrawer/ListDrawer';

import PropTypes from 'prop-types';

export const RegisterForm = ({ action, cssClassName, encType, inputs, method }) => {
  const signIn = (e) => {
    e.preventDefault();
    console.log(e); //TODO: gestionar submit
  };
  return (
    <form action={action} className={cssClassName} encType={encType} method={method} onSubmit={signIn}>
      <ListDrawer type="inputs" items={inputs}></ListDrawer>
    </form>
  );
};

RegisterForm.propTypes = {
  action: PropTypes.string.isRequired,
  cssClassName: PropTypes.string,
  encType: PropTypes.string,
  inputs: PropTypes.array.isRequired,
  method: PropTypes.string.isRequired,
};
RegisterForm.defaultProps = {
  encType: 'multipart/form-data',
  cssClassName: 'credentialsForm',
};
