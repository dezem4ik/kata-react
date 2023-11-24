import React from "react";
import PropTypes from "prop-types";

import "./header.css";
import NewTaskForm from "../new-task-form";

function Header({ onAdded }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdded={onAdded} />
    </header>
  );
}

Header.propTypes = {
  onAdded: PropTypes.func.isRequired,
};

export default Header;
