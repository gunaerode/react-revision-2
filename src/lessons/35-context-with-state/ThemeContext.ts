import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// No default value that makes sense here - toggleTheme needs a real implementation,
// so this is undefined until a Provider supplies it, and useTheme (below-ish) checks that.
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
