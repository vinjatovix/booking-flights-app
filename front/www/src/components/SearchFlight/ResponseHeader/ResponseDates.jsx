import React from 'react';

export const ResponseDates = ({ salida, llegada, adults }) => {
  return (
    <ul className="Response__dates">
      <li>{salida}</li>
      {llegada !== 'NaNEne' && (
        <>
          <li>-</li>
          <li>{llegada}</li>
        </>
      )}
      <li>{adults} px</li>
    </ul>
  );
};
