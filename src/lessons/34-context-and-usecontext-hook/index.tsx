import { useContext, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { ThemeContext, type Theme } from "./ThemeContext";

const meta = metaFor("34-context-and-usecontext-hook");

// Toolbar no longer accepts a theme prop at all - it has genuinely nothing to do
// with theming anymore, which is the fix for lesson 33's problem.
function Toolbar() {
  return (
    <div style={{ padding: 12, border: "1px dashed #999" }}>
      <p className="demo-label">Toolbar (doesn't mention theme anywhere in its code)</p>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // useContext(ThemeContext) reads whatever value the nearest ThemeContext.Provider
  // ABOVE this component in the tree is currently providing - no prop needed.
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#eee" : "#222",
      }}
    >
      Themed button ({theme})
    </button>
  );
}

export default function ContextAndUseContextHook() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "createContext(default) makes a Context object. ThemeContext.Provider value={theme} makes that value available to every component nested inside it, at any depth.",
        "useContext(ThemeContext) inside ThemedButton reads the nearest Provider's value directly - Toolbar in between now has zero theme-related code, fixing lesson 33's drilling.",
        "The Provider's value can change over time (it's just theme here, driven by the same useState as before) - every consumer re-renders automatically when it does.",
      ]}
      docsNote="Matches react.dev's useContext reference and the Passing Data Deeply with Context guide."
    >
      <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
        Toggle theme (currently {theme})
      </button>
      <ThemeContext.Provider value={theme}>
        <Toolbar />
      </ThemeContext.Provider>
    </LessonLayout>
  );
}
