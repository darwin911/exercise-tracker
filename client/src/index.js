import "./style/index.css";

import { App } from "./App";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Store } from "./Store";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>
);
