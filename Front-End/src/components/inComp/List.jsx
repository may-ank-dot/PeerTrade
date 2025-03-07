import React from "react";

let List = (props) => {
    return (
        <ul>
            <li>
                <a href={props.href}>{props.name}</a>
            </li>
        </ul>
    )
}

export default List;