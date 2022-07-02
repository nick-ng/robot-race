import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import OptionsContextProvider from "./hooks/options-context";

const GlobalStyle = createGlobalStyle`
  body {
    color: #ffffff;
    background-color: #000000;
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: lightskyblue;
  }

  summary,
  button,
  input[type="checkbox"] {
    cursor: pointer;
  }

  summary {
    text-decoration: underline;
  }
`;

import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <OptionsContextProvider>
        <App />
      </OptionsContextProvider>
    </BrowserRouter>
  </StrictMode>
);
