import React from "react";
import { ListItem } from "./ListItem";


export const LinkList = (props) => {
    return (
        <>
            <h3>{props.title}</h3>
            <ul className={props.cssClassName}>
                {props.items.map((item) => {
                    return (
                        <ListItem key={`a${item.name}`} name={item.name}>
                            <a href={item.url} children={item.linkText || "Link"} />
                        </ListItem>
                    );
                })}
            </ul>
        </>
    );
};
