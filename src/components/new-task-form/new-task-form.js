import React, { Component } from "react";
import PropTypes from "prop-types";

import "./new-task-form.css";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const { onAdded } = this.props;
    this.setState({ label: "" });
    const cb = onAdded || (() => {});
    cb(label);
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          id="newTaskFormInput"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
};
