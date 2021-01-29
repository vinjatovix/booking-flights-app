import React from "react";
import { GenericList } from "./GenericList";
import { InputList } from "./InputList";
import { LinkList } from "./LinkList";
import { ParagraphList } from "./ParagraphList";

export const ListDrawer = (props) => {
  if (props.type === "inputs") {
    return <InputList {...props} />;
  }
  if (props.type === "links") {
    return <LinkList {...props} />;
  }
  if (props.type === "p") {
    return <ParagraphList {...props} />;
  }
  return <GenericList {...props} />;
};


