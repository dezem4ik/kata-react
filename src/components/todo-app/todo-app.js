import React, { Component } from "react";

import Footer from "../footer";
import TaskList from "../task-list";
import Header from "../header";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.maxId = 100;

    this.state = {
      todoData: [
        this.createTaskItem("Completed task"),
        this.createTaskItem("Editing task"),
        this.createTaskItem("Active task"),
      ],
      filter: "all",
    };

    this.formatTime = (elapsedTime, minutes, seconds) => {
      const pad = (num) => (num < 10 ? `0${num}` : num);
      const hours = Math.floor(elapsedTime / 3600);
      const min = Math.floor((elapsedTime % 3600) / 60) + minutes;
      const sec = Math.floor(elapsedTime % 60) + seconds;
      return `${pad(hours)}:${pad(min)}:${pad(sec)}`;
    };
  }

  componentDidMount() {
    this.updateTimeInterval = setInterval(() => {
      this.updateTaskCreationTime();
      this.updateTimerElapsedTime();
      this.decreaseTimers();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimeInterval);
  }

  decreaseTimers = () => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => {
        if (task.minutes > 0 || task.seconds > 0) {
          let updatedMinutes = task.minutes;
          let updatedSeconds = task.seconds - 1;

          if (updatedSeconds < 0) {
            updatedMinutes -= 1;
            updatedSeconds = 59;
          }

          return {
            ...task,
            minutes: updatedMinutes,
            seconds: updatedSeconds,
          };
        }

        return task;
      }),
    }));
  };

  createTaskItem = (description) => {
    this.maxId += 1;
    const id = this.maxId;
    const created = new Date();

    return {
      id,
      description,
      created,
      status: "active",
      timerElapsedTime: 0,
      isTimerRunning: false,
      minutes: 0,
      seconds: 0,
    };
  };

  updateTimerElapsedTime = () => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => {
        if (task.isTimerRunning) {
          return { ...task, timerElapsedTime: task.timerElapsedTime + 1 };
        }
        return task;
      }),
    }));
  };

  startTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => {
        if (task.id === id) {
          return { ...task, isTimerRunning: true };
        }
        return task;
      }),
    }));
  };

  pauseTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) =>
        task.id === id ? { ...task, isTimerRunning: false } : task,
      ),
    }));
  };

  onSaveTask = (id, editedDescription) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((item) =>
        item.id === id ? { ...item, description: editedDescription } : item,
      );

      return { todoData: updatedTodoData };
    });
  };

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
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "done" ? "active" : "done" }
          : item,
      ),
    }));
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

  onItemAdded = (label, minutes, seconds) => {
    this.setState((prevState) => {
      const item = this.createTaskItem(label);
      item.minutes = minutes;
      item.seconds = seconds;
      return { todoData: [...prevState.todoData, item] };
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
    }
    if (filter === "active") {
      return todoData.filter((item) => item.status === "active");
    }
    if (filter === "done") {
      return todoData.filter((item) => item.status === "done");
    }
    return todoData;
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
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
            formatTime={this.formatTime}
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
