import React, { Component } from 'react';

import './tasks-filter.css'

export default class TasksFilter extends Component {

    render() {

        const {status, condition} = this.props

        return (
            <button type="button" className={status}>{condition}</button>
        );
    }

}

//const TasksFilter = ({status, condition}) => {
    

