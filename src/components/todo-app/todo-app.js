/* eslint-disable */
import React, { useState, useEffect } from "react";
import Footer from "../footer";
import TaskList from "../task-list";
import Header from "../header";


const createTaskItem = (description, id) => {
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

const TodoApp = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [maxId, setMaxId] = useState(100);

  useEffect(() => {
    setTodoData([
      createTaskItem("Completed task", maxId + 1),
      createTaskItem("Editing task", maxId + 2),
      createTaskItem("Active task", maxId + 3),
    ]);
    setMaxId(maxId + 3);
  }, []);

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      updateTaskCreationTime();
      updateTimerElapsedTime();
      decreaseTimers();
    }, 1000);

    return () => clearInterval(updateTimeInterval);
  }, []);

  const formatTime = (elapsedTime, minutes, seconds) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(elapsedTime / 3600);
    const min = Math.floor((elapsedTime % 3600) / 60) + minutes;
    const sec = Math.floor(elapsedTime % 60) + seconds;
    return `${pad(hours)}:${pad(min)}:${pad(sec)}`;
  };

  const generateUniqueId = () => {
    setMaxId((prevMaxId) => prevMaxId + 1);
    return maxId + 1;
  };

  const decreaseTimers = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) => {
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
      })
    );
  };

  const updateTimerElapsedTime = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) =>
        task.isTimerRunning ? { ...task, timerElapsedTime: task.timerElapsedTime + 1 } : task
      )
    );
  };

  const startTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) =>
        task.id === id ? { ...task, isTimerRunning: true } : task
      )
    );
  };

  const pauseTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((task) =>
        task.id === id ? { ...task, isTimerRunning: false } : task
      )
    );
  };

  const onSaveTask = (id, editedDescription) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.id === id ? { ...item, description: editedDescription } : item
      )
    );
  };

  const updateTaskCreationTime = () => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => ({
        ...item,
        created: new Date(item.created),
      }))
    );
  };

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "done" ? "active" : "done" }
          : item
      )
    );
  };

  const onClearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => item.status === "active"));
    setFilter("all");
  };

  const onItemAdded = (label, minutes, seconds) => {
    const id = generateUniqueId();
    const item = createTaskItem(label, id);
    item.minutes = minutes;
    item.seconds = seconds;
    setTodoData((prevTodoData) => [...prevTodoData, item]);
  };

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id));
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const filterItems = () => {
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

  const doneCount = todoData.filter((el) => el.status === "done").length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <Header onAdded={onItemAdded} />
      <section className="main">
        <TaskList
          todos={filterItems()}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onSaveTask={onSaveTask}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          formatTime={formatTime}
        />
        <Footer
          filter={filter}
          onFilterChange={onFilterChange}
          todoCount={todoCount}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );
};

export default TodoApp;


