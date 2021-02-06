import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const setErrorMessage = (string) => {
    setValues({
      ...values,
      errorMessage: string,
    });
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  return [values, handleInputChange, setErrorMessage];
};
