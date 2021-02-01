import React from 'react';

export const Main = ({ className, children }) => {
  console.log(className);
  return <main className={className}>{children}</main>;
};
