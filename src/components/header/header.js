import React from "react";
import "./header.css"
import NewTaskForm from "../new-task-form";


const Header = ({onAdded}) => {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAdded = {onAdded}/>
        </header>
    );
};

export default Header;