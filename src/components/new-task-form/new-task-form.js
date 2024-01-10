import React, { Component } from "react";
import PropTypes from "prop-types";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  static isNumeric(value) {
    return !Number.isNaN(value) && value !== "" && value !== null;
  }

  constructor(props) {
    super(props);
    this.state = {
      label: "",
      minutes: 0,
      seconds: 0,
    };

    this.onMinutesChange = this.onMinutesChange.bind(this);
    this.onSecondsChange = this.onSecondsChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onMinutesChange = (e) => {
    const { value } = e.target;
    this.setState({
      minutes: value !== "" ? parseInt(value, 10) : 0,
    });
  };

  onSecondsChange = (e) => {
    const { value } = e.target;
    this.setState({
      seconds: value !== "" ? parseInt(value, 10) : 0,
    });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;
    const { onAdded } = this.props;

    if (
      label.trim() !== "" &&
      !Number.isNaN(minutes) &&
      !Number.isNaN(seconds)
    ) {
      this.setState({ label: "", minutes: 0, seconds: 0 });
      const cb = onAdded || (() => {});
      cb(label, parseInt(minutes, 10), parseInt(seconds, 10));
    }
  };

  handleKeyPress = (e) => {
    const { label } = this.state;

    if (e.key === "Enter" && label.trim() !== "") {
      e.preventDefault();
      this.onSubmit(e);
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          id="newTaskFormInput"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          onKeyPress={this.handleKeyPress}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinutesChange}
          value={minutes > 0 ? minutes : ""}
          onKeyPress={this.handleKeyPress}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecondsChange}
          value={seconds > 0 ? seconds : ""}
          onKeyPress={this.handleKeyPress}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};
