import React, { useState } from "react";
import PropTypes from "prop-types";

import "./new-task-form.css";

function NewTaskForm({ onAdded }) {
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      label.trim() !== "" &&
      !Number.isNaN(minutes) &&
      !Number.isNaN(seconds)
    ) {
      const cb = onAdded || (() => {});
      cb(label, parseInt(minutes, 10), parseInt(seconds, 10));
      setLabel("");
      setMinutes(0);
      setSeconds(0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && label.trim() !== "") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        id="newTaskFormInput"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={(e) => setLabel(e.target.value)}
        onKeyPress={handleKeyPress}
        value={label}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) =>
          setMinutes(e.target.value !== "" ? parseInt(e.target.value, 10) : 0)
        }
        value={minutes > 0 ? minutes : ""}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) =>
          setSeconds(e.target.value !== "" ? parseInt(e.target.value, 10) : 0)
        }
        value={seconds > 0 ? seconds : ""}
        onKeyPress={handleKeyPress}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
