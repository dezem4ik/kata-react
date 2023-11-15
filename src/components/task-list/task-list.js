import React, { Component } from "react";

import './task-list.css'

import Task from '../task'

export default class TaskList extends Component {

    render() {

        const {todos, onDeleted} = this.props;
        

        const elements = todos.map((item) => {
            return (
                <li key={item.id} className={item.status}>
                    <Task 
                        description={item.description} 
                        created={item.created} 
                        onClick={() => onDeleted(item.id)}
                    />
                </li>
    
    
            )
        })
        return (
            
                <ul className="todo-list">
                    { elements }
                </ul>
        );
    }

}
