import React from 'react';
import { ResponseList } from './ResponseList/ResponseList';
import { ResponseHeader } from './ResponseHeader/ResponseHeader';

export const Response = (props) => {
  return (
    <div className="Response">
      {props.response.adults && <ResponseHeader {...props} />}
      <ResponseList {...props} />
    </div>
  );
};
