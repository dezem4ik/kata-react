import React, { Component } from "react";
import PropTypes from "prop-types";

import "./tasks-filter.css";

export default class TasksFilter extends Component {
  render() {
    const { label, onFilterChange, classNames } = this.props;

    return (
      <button type="button" className={classNames} onClick={onFilterChange}>
        {label}
      </button>
    );
  }
}

TasksFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  classNames: PropTypes.string.isRequired,
};
