import { useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

// The state itself (useState) still lives in exactly one place - a Provider
// component. Context doesn't replace state, it just changes how far down the tree
// that state (and a way to change it) can reach without prop drilling.
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
