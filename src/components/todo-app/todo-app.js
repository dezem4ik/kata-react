import React, { Component } from 'react';

import Footer from '../footer';
import TaskList from '../task-list'
import Header from '../header'

export default class TodoApp extends Component {

    state = {
        todoData: [
            { description: 'Completed task', created: 'created 17 seconds ago', status: 'completed', id: 1},
            { description: 'Editing task', created: 'created 5 minutes ago', status: 'editing', id: 2 },
            { description: 'Active task', created: 'created 5 minutes ago' ,id: 3 }
        ], 
        filterData: [
            { condition: 'All', clear: 'Clear completed', id: 1, status: 'selected'},
            { condition: 'Active', clear: 'Clear completed', id: 2 },
            { condition: 'Completed', clear: 'Clear completed', id: 3 }
        ]
    }

    deleteItem = (id) => {

        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

            return {
                todoData: newArr
            }
        })

    }

    render() {
        
        const {todoData, filterData} = this.state

        return (
            <section className="todoapp">
                <Header />
                <section className="main">
                    <TaskList 
                    todos = {todoData} 
                    onDeleted = {this.deleteItem}
                    />
                    <Footer filters = {filterData}/>
                </section>
            </section>
        )
    }

}
