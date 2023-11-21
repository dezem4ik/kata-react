import React from "react";
import PropTypes from 'prop-types';

import "./footer.css"
import TasksFilter from "../tasks-filter";

const filterItems = [
    { name: 'all', label: 'All'},
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Completed'}
]

const Footer = ({todoCount, filter, onFilterChange, onClearCompleted }) => {
    const elements = filterItems.map(({name, label}) => {
        const isActive = name === filter;
        const classNames = isActive ? 'selected': ''

        return (
            <li key={name}>
                <TasksFilter 
                    label={label}
                    classNames={classNames}
                    onFilterChange={() => { 
                        onFilterChange(name); 
                    }} 
                />
            </li>
        )
    })

    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <ul className="filters">
                {elements}
            </ul>
            <button 
                className="clear-completed"
                onClick={() => { 
                    onClearCompleted()
                }}
            >Clear completed</button>
        </footer>
    );
};

Footer.propTypes = {
    todoCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
}

export default Footer;
