import React from "react";
import PropTypes from "prop-types";

import "./task-list.css";
import Task from "../task";

function TaskList({ todos, onDeleted, onToggleDone, onSaveTask }) {
  const elements = todos.map((item) => (
    <li key={item.id} className={item.status === "done" ? "completed" : ""}>
      <Task
        id={item.id}
        description={item.description}
        created={item.created}
        onDeleted={() => onDeleted(item.id)}
        status={item.status}
        onToggleDone={() => onToggleDone(item.id)}
        onSaveTask={onSaveTask}
      />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["active", "done"]).isRequired,
    }),
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
};

export default TaskList;
