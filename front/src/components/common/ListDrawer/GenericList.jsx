import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ListItem } from './ListItem';

export const GenericList = (props) => {
  return (
    <>
      <h3>{props.title}</h3>
      <ul className={props.cssClassName}>
        {props.items.map((item) => {
          return <ListItem key={uuidv4()}>{item}</ListItem>;
        })}
      </ul>
    </>
  );
};
