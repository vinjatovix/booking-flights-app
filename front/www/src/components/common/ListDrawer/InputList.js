import React from "react";

export const InputList = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return <input key={`input${item.id}`} {...item} />;
      })}
    </>
  );
};
