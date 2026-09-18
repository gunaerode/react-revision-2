import { createContext } from "react";

export type Theme = "light" | "dark";

// createContext(defaultValue) makes a "channel" any descendant can tune into with
// useContext, without it being passed as a prop through every level in between.
// The default value here only applies if a component reads the context with no
// matching <ThemeContext.Provider> above it in the tree.
export const ThemeContext = createContext<Theme>("light");
