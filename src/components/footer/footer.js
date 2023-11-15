import React from "react";

import "./footer.css"
import TasksFilter from "../tasks-filter";


const Footer = ({filters}) => {

    const elements = filters.map((item) => {
        return (
            <li key={item.id}><TasksFilter condition={item.condition} status={item.status}/></li>
        )
    })

    const count = 1

    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <ul className="filters">
                {elements}
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
};

//const formattedCreated = format(new Date(created), "yyyy-MM-dd HH:mm:ss");

export default Footer;

