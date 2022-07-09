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

  button {
    box-sizing: border-box;
    border-color: #dcdcdc;
    border-width: 3px;
    border-style: outset;
    background-color: #dcdcdc;
    padding: 0.5em;

    &:active {
      border-style: inset;
    }
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
