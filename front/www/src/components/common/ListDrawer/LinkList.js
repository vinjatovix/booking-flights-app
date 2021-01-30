import React from "react";
import { ListItem } from "./ListItem";
import { v4 as uuidv4 } from "uuid";

export const LinkList = (props) => {
  return (
    <>
      <h3>{props.title}</h3>
      <ul className={props.cssClassName}>
        {props.items.map((item) => {
          return (
            <ListItem key={`a${uuidv4()}}`} name={item.name}>
              <a href={item.url} children={item.linkText || item.children} />
            </ListItem>
          );
        })}
      </ul>
    </>
  );
};
