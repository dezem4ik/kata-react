import React, { Component } from "react";
import PropTypes from "prop-types";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    this.setState({ label: "" });
    const cb = this.props.onAdded || (() => {});
    cb(label);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="newTaskFormInput"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};
