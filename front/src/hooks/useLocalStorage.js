import { useState, useEffect } from 'react';

export const useLocalStorage = (initialValue, key = 'data') => {
  const [datos, setDatos] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(datos));
  }, [datos, key]);
  return [datos, setDatos];
};
