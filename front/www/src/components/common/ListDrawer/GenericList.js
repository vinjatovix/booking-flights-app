import React from "react";
import { ListItem } from "./ListItem";


export const GenericList = (props) => {
    return (
        <>
            <h3>{props.title}</h3>
            <ul className={props.cssClassName}>
                {props.items.map((item) => {
                    return <ListItem key={`li${item}`}>{item}</ListItem>;
                })}
            </ul>
        </>
    );
};
