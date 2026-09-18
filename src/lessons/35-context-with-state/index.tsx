import { useContext } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import ThemeProvider from "./ThemeProvider";
import { ThemeContext } from "./ThemeContext";

const meta = metaFor("35-context-with-state");

function Panel() {
  return (
    <div style={{ padding: 12, border: "1px dashed #999" }}>
      <p className="demo-label">Panel (just a wrapper, no theme code)</p>
      <ThemeSwitch />
    </div>
  );
}

// Three levels deep in the tree, with no props threaded down to get here - and it
// can both READ theme and CHANGE it, because the Provider shared both.
function ThemeSwitch() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeSwitch must be rendered inside a ThemeProvider");
  const { theme, toggleTheme } = ctx;

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "dark" ? "#222" : "#eee",
        color: theme === "dark" ? "#eee" : "#222",
      }}
    >
      Currently {theme} - click to toggle
    </button>
  );
}

export default function ContextWithState() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Lesson 34's context only shared a read-only value. Here the Provider's value is { theme, toggleTheme } - an object bundling the current value AND a function to change it.",
        "ThemeSwitch, three components deep, reads theme AND calls toggleTheme() directly - no callback prop had to be drilled down to reach it, because both pieces travelled through context together.",
        "ThemeProvider.tsx is the only place useState for theme exists - moving the Provider is how you'd control which part of the tree shares this state, same idea as lifting state up (lesson 26), just via context instead of props.",
      ]}
      docsNote="This pattern - useState inside a Provider component - is what react.dev calls 'combining a reducer/state with context' when scaling context up."
    >
      <ThemeProvider>
        <Panel />
      </ThemeProvider>
    </LessonLayout>
  );
}
