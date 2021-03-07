import { useState } from 'react';

export const useCounter = (initialState = 1, max = 9, min = 1, factor = 1) => {
  const [state, setState] = useState(initialState);
  const increment = () => {
    state + factor > max ? setState(max) : setState(state + factor);
  };
  const decrement = () => {
    state - factor < min ? setState(min) : setState(state - factor);
  };
  return { state, increment, decrement };
};
