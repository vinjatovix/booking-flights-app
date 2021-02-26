import React from 'react';

//TODO: con react memo? se sigue renderizando cada item
export const Input = (item) => {
  const { r, id, name, handler, ...extra } = item;
  return <input key={id} name={name} ref={r} onChange={handler} {...extra} />;
};
