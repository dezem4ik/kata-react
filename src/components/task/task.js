import React, { Component } from "react";

import './task.css'

export default class Task extends Component {
    
    state =  {
        done: false
    }

    onClickTask = () => {
        this.setState(({done}) => {
            return {
                done: !done
            };
        });
    }

    render() {

        const {description, created, onClick} = this.props;
        const {done} = this.state;

        let itemClass = 'description'
        if(done) {
            itemClass += ' completed'
        }

        return (
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span 
                        className={itemClass}
                        onClick = {this.onClickTask}
                    >
                        {description}
                    </span>
                    <span className="created ">{created}</span>
                </label>
                <button className="icon icon-edit"/>
                <button className="icon icon-destroy"
                onClick = {onClick}
                />
            </div>  
        )
    }

}

