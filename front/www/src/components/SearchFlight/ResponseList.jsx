import React from 'react';
import { ResponseFlight } from './ResponseFlight';

export const ResponseList = React.memo(({ data, logged }) => {
  return (
    <ul className="Response-list">
      {data?.map((element) => (
        <ResponseFlight key={element.id} id={element.id} auth={logged} {...element} />
      ))}
    </ul>
  );
});
