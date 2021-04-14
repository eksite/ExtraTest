import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import "./styles/style.css"

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById("root")
);
