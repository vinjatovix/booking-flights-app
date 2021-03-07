import React from "react";

import { ResponseHeader } from "./ResponseHeader/ResponseHeader";
import { ResponseList } from "./ResponseList/ResponseList";

export const Response = (props) => {
  return (
    <div className="Response ">
      {props.response.adults && <ResponseHeader {...props} />}
      <ResponseList {...props} />
    </div>
  );
};
