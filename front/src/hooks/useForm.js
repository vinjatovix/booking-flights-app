import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const setErrorMessage = (string) => {
    setValues({
      ...values,
      errorMessage: string,
    });
  };

  const resetInput = ({ target }) => {
    setValues({
      ...values,
      [target.name]: '',
    });
  };
  return [values, handleInputChange, setErrorMessage, resetInput];
};
