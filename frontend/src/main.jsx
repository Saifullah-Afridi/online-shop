import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./main.css";
import { theme } from "./components/theme.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  setTimeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </ChakraProvider>
  // </React.StrictMode>
);
