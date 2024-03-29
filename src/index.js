import React from "react";
import { createRoot } from "react-dom/client";

import TodoApp from "./components/todo-app";

// const container = document.getElementById('body');

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container);
root.render(<TodoApp />);
