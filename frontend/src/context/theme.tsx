/** @format */

import { DraftBlockRenderConfig } from "draft-js";
import { Children, createContext, useContext, useState } from "react";

interface ThemeContext {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  toggleTheme: () => void;
}
const themeContext = createContext<ThemeContext>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error("useTheme must be used inside of ThemeProvider");
  }

  return context;
}

export function ThemeProvider({ children }: { children: any }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };

  return (
    <themeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}
