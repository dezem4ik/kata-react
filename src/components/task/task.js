import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

import Timer from "../timer/timer";
import "./task.css";

function Task({
  id,
  description,
  created,
  status,
  onDeleted,
  onToggleDone,
  onSaveTask,
  timerElapsedTime,
  isTimerRunning,
  pauseTimer,
  formatTime,
  startTimer,
  minutes,
  seconds,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const editContainerRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDescription(description);
  };

  const handleSaveClick = () => {
    onSaveTask(id, editedDescription);
    setIsEditing(false);
    setEditedDescription("");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDescription("");
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target === document.activeElement) {
      event.preventDefault();
      handleSaveClick();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleCancelClick();
      }
    };

    const handleClickOutside = () => {
      setTimeout(() => {
        if (
          editContainerRef.current &&
          !editContainerRef.current.contains(document.activeElement) &&
          isEditing
        ) {
          handleCancelClick();
        }
      }, 0);
    };

    document.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const distanceInSeconds = Math.round((new Date() - new Date(created)) / 1000);
  let formattedDistance;
  if (distanceInSeconds < 60) {
    formattedDistance = `created ${distanceInSeconds} seconds ago`;
  } else {
    formattedDistance = `created ${formatDistanceToNow(created, {
      addSuffix: true,
      includeSeconds: false,
      locale: enUS,
    })}`;
  }

  return (
    <div className={`view ${isEditing ? "editing" : ""}`}>
      <input
        checked={status === "done"}
        className="toggle"
        type="checkbox"
        onChange={onToggleDone}
      />
      <label htmlFor="newTaskFormInput">
        <span
          className="description"
          onClick={isEditing ? undefined : onToggleDone}
          onKeyDown={(event) => {
            if (!isEditing && event.key === "Enter") {
              onToggleDone();
            }
          }}
          role="button"
          tabIndex={0}
          ref={editContainerRef}
        >
          {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              onKeyPress={handleKeyPress}
              autoFocus
              id="newTaskFormInput"
              aria-label="Edit task description"
            />
          ) : (
            description
          )}
        </span>
        <div className="timer-container">
          <Timer
            elapsedTime={timerElapsedTime}
            isRunning={isTimerRunning}
            onPause={pauseTimer}
            onStart={startTimer}
            formatTime={formatTime}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
        <span className="created">{formattedDistance}</span>
      </label>
      <button
        type="button"
        className={`icon icon-edit ${isEditing ? "editing" : ""}`}
        onClick={isEditing ? handleSaveClick : handleEditClick}
        aria-label={isEditing ? "Save task" : "Edit task"}
      />
      {isEditing && (
        <button
          type="button"
          className="icon icon-destroy"
          onClick={handleCancelClick}
          aria-label="Cancel edit"
        />
      )}
      <button
        type="button"
        className="icon icon-destroy"
        onClick={onDeleted}
        aria-label="Delete task"
      />
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.oneOf(["active", "done"]).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
};

export default Task;
