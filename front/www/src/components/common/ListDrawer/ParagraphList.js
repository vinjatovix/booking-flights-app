import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ParagraphList = (props) => {
  return (
    <>
      {props.items.map((p) => {
        return <p key={uuidv4()}>{p.text}</p>;
      })}
    </>
  );
};
