/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./css/lib.css";
import "./index.css";
import { AuthProvider } from "./context/auth.tsx";
import { ThemeProvider } from "./context/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
