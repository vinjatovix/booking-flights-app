import React from "react";
import { ListItem } from "../common/ListItem";

export const AboutLinks = ({ cssClassName, title, items }) => {
  return (
    <>
      <h3>{title}</h3>
      <ul className={cssClassName}>
        {items.map((item) => {
          return (
            <ListItem key={item.name} name={item.name}>
              <a href={item.url} children={item.linkText || "Link"} />
            </ListItem>
          );
        })}
      </ul>
    </>
  );
};
