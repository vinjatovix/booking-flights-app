import React from 'react';

export const Form = ({ className, method = 'GET', endpoint, encType = 'multipart/form-data', handler, children }) => {
  return (
    <form className={className} method={method} endpoint={endpoint} encType={encType} onSubmit={handler}>
      {children}
    </form>
  );
};
