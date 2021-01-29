import React from "react";

export const ListItem = ({ name, children }) => {
  return (
    <li>
      {name}: {children}
    </li>
  );
};
