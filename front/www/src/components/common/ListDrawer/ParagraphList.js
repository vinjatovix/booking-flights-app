import React from "react";


export const ParagraphList = (props) => {
    return (
        <>
            {props.items.map((p) => {
                return <p key={`p${p.id}`}>{p.text}</p>;
            })}
        </>
    );
};
