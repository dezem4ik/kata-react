import React, { Component } from "react";

import Footer from "../footer";
import TaskList from "../task-list";
import Header from "../header";

export default class TodoApp extends Component {
  maxId = 100;

  createTaskItem = (description) => {
    const id = ++this.maxId;
    const created = new Date();

    return {
      id,
      description,
      created,
      status: "active",
    };
  };

  state = {
    todoData: [
      this.createTaskItem("Completed task"),
      this.createTaskItem("Editing task"),
      this.createTaskItem("Active task"),
    ],
    filter: "all",
  };

  onSaveTask = (id, editedDescription) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((item) =>
        item.id === id ? { ...item, description: editedDescription } : item,
      );

      return { todoData: updatedTodoData };
    });
  };

  componentDidMount() {
    this.updateTimeInterval = setInterval(() => {
      this.updateTaskCreationTime();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeInterval);
  }

  updateTaskCreationTime = () => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((item) => ({
        ...item,
        created: new Date(item.created),
      }));

      return { todoData: updatedTodoData };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "done" ? "active" : "done" }
            : item,
        ),
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.filter(
        (item) => item.status === "active",
      );

      return {
        todoData: updatedTodoData,
        filter: "all",
      };
    });
  };

  onItemAdded = (label) => {
    this.setState((state) => {
      const item = this.createTaskItem(label, new Date());

      return { todoData: [...state.todoData, item] };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems = () => {
    const { filter, todoData } = this.state;
    if (filter === "all") {
      return todoData;
    } else if (filter === "active") {
      return todoData.filter((item) => item.status === "active");
    } else if (filter === "done") {
      return todoData.filter((item) => item.status === "done");
    } else {
      return todoData;
    }
  };

  render() {
    const { todoData, filter } = this.state;
    const doneCount = todoData.filter((el) => el.status === "done").length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <Header onAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            todos={this.filterItems()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onSaveTask={this.onSaveTask}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            todoCount={todoCount}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
