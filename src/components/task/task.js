import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

import "./task.css";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedDescription: "",
    };
  }

  handleEditClick = () => {
    const { description } = this.props;
    this.setState({
      isEditing: true,
      editedDescription: description,
    });
  };

  handleSaveClick = () => {
    const { id, onSaveTask } = this.props;
    const { editedDescription } = this.state;
    onSaveTask(id, editedDescription);
    this.setState({
      isEditing: false,
      editedDescription: "",
    });
  };

  handleCancelClick = () => {
    this.setState({
      isEditing: false,
      editedDescription: "",
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      editedDescription: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSaveClick();
    }
  };

  render() {
    const { description, created, status, onDeleted, onToggleDone } =
      this.props;
    const { isEditing, editedDescription } = this.state;

    const distanceInSeconds = Math.round(
      (new Date() - new Date(created)) / 1000,
    );

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
            onClick={onToggleDone}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onToggleDone();
              }
            }}
            role="button"
            tabIndex={0}
          >
            {isEditing ? (
              <input
                type="text"
                value={editedDescription}
                onChange={this.handleDescriptionChange}
                onKeyPress={this.handleKeyPress}
                autoFocus
                id="newTaskFormInput"
                aria-label="Edit task description"
              />
            ) : (
              description
            )}
          </span>
          <span className="created">{formattedDistance}</span>
        </label>
        <button
          type="button"
          className={`icon icon-edit ${isEditing ? "editing" : ""}`}
          onClick={isEditing ? this.handleSaveClick : this.handleEditClick}
          aria-label={isEditing ? "Save task" : "Edit task"}
        />
        {isEditing && (
          <button
            type="button"
            className="icon icon-destroy"
            onClick={this.handleCancelClick}
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
