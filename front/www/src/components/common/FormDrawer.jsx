import React from 'react';
import PropTypes from 'prop-types';
import { InputList } from './ListDrawer/InputList';
import { ErrorMessage } from './ErrorMessage';

export const FormDrawer = React.memo((props) => {
  const { cssClassName, handleSubmit, errorMessage } = props;
  return (
    <>
      <form className={cssClassName} onSubmit={handleSubmit}>
        <InputList {...props} />
      </form>
      <ErrorMessage children={errorMessage} />
    </>
  );
});
FormDrawer.propTypes = {
  cssClassName: PropTypes.string,
};
FormDrawer.defaultProps = {
  cssClassName: 'credentialsForm',
};
