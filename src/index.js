import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import store from './redux/store.jsx'
import { Provider } from "react-redux";
import "./styles/style.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
