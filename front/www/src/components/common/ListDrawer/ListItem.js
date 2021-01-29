import React from "react";

/** */
export const ListItem = ({ name: item, children }) => {
  if (children) {
    return (
      <li>
        {item}: {children}
      </li>
    );
  }
  return <li>{item}</li>;
};
