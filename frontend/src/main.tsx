/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./css/lib.css";
import "./index.css";
import "./css/tiptap.css";

import { AuthProvider } from "./context/auth.tsx";
import {
  ChakraProvider,
  ColorModeProvider,
  CSSReset,
  LightMode,
  DarkMode,
} from "@chakra-ui/react";
import theme from "./theme.ts";

const DarkOrLightMode = ({
  forceThemeMode,
  children,
}: {
  forceThemeMode?: "light" | "dark" | undefined;
  children: React.ReactNode;
}) => {
  if (forceThemeMode === "light") {
    return <LightMode>{children}</LightMode>;
  }

  if (forceThemeMode === "dark") {
    return <DarkMode>{children}</DarkMode>;
  }

  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
