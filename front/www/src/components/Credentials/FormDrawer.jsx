import React from 'react';
import PropTypes from 'prop-types';
import { InputList } from '../common/ListDrawer/InputList';
import { ErrorMessage } from '../common/index';

import './formDrawer.css';
import { buttonProps } from './credentialsFormProps';
import { Input } from '../common/index';
import { GoogleButton } from './GoogleButton';

export const FormDrawer = React.memo((props) => {
  const { cssClassName, handleSubmit, errorMessage } = props;
  return (
    <>
      <form className={cssClassName} onSubmit={handleSubmit}>
        <InputList {...props} />
        <Input {...buttonProps} />
        <GoogleButton {...props} />
      </form>
      <ErrorMessage children={errorMessage} />
    </>
  );
});
FormDrawer.propTypes = {
  cssClassName: PropTypes.string,
};
FormDrawer.defaultProps = {
  cssClassName: 'Form',
};
