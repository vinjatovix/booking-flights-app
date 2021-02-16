import React from 'react';

export const Input = React.memo((item) => {
  const { r, id, name, ...extra } = item;
  return <input key={id} name={name} ref={r} {...extra} />;
});
