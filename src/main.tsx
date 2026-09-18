// Before React 16.8 / legacy API (pre React 18), mounting looked like this:
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
//
// ReactDOM.render(<App />, document.getElementById("root"));

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
