import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/lesson/Sidebar";
import { lessons } from "./lessons/registry";

const DEFAULT_LESSON_ID = lessons[0].id;
const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [activeId, setActiveId] = useState(DEFAULT_LESSON_ID);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const ActiveLesson = active.Component;

  // data-theme goes on the root <html> element (not some wrapper div) so
  // index.css can style <body>'s own background/text color from the same
  // selector, rather than only the div tree React renders into.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeId={activeId}
        onSelect={setActiveId}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="app-main">
        {/* Only visible below the mobile breakpoint - the sidebar is static above it. */}
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open lesson menu">
          ☰ Lessons
        </button>
        <ActiveLesson />
        <div className="extras-note">
          <p className="demo-label">Also completed directly on react.dev (outside this playlist)</p>
          <ul>
            <li>
              <a href="https://react.dev/learn/tutorial-tic-tac-toe" target="_blank" rel="noreferrer">
                Tutorial: Tic-Tac-Toe
              </a>{" "}
              - components, props, state, immutability, lifting state up, time travel.
            </li>
            <li>
              <a href="https://react.dev/reference/react" target="_blank" rel="noreferrer">
                API Reference
              </a>
              ,{" "}
              <a href="https://react.dev/reference/react/legacy" target="_blank" rel="noreferrer">
                Legacy APIs
              </a>
              , and{" "}
              <a href="https://react.dev/learn/react-compiler/debugging" target="_blank" rel="noreferrer">
                React Compiler Debugging
              </a>{" "}
              - pending, next after this playlist.
            </li>
            <li>
              Hooks not yet built as their own lesson - reference only, for now:{" "}
              <a href="https://react.dev/reference/react/useMemo" target="_blank" rel="noreferrer">useMemo</a>,{" "}
              <a href="https://react.dev/reference/react/useLayoutEffect" target="_blank" rel="noreferrer">useLayoutEffect</a>,{" "}
              <a href="https://react.dev/reference/react/useInsertionEffect" target="_blank" rel="noreferrer">useInsertionEffect</a>,{" "}
              <a href="https://react.dev/reference/react/useEffectEvent" target="_blank" rel="noreferrer">useEffectEvent</a>,{" "}
              <a href="https://react.dev/reference/react/useImperativeHandle" target="_blank" rel="noreferrer">useImperativeHandle</a>,{" "}
              <a href="https://react.dev/reference/react/useId" target="_blank" rel="noreferrer">useId</a>,{" "}
              <a href="https://react.dev/reference/react/useSyncExternalStore" target="_blank" rel="noreferrer">useSyncExternalStore</a>,{" "}
              <a href="https://react.dev/reference/react/useDebugValue" target="_blank" rel="noreferrer">useDebugValue</a>,{" "}
              <a href="https://react.dev/reference/react/useActionState" target="_blank" rel="noreferrer">useActionState</a>,{" "}
              <a href="https://react.dev/reference/react-dom/hooks/useFormStatus" target="_blank" rel="noreferrer">useFormStatus</a>,{" "}
              and the{" "}
              <a href="https://react.dev/reference/eslint-plugin-react-hooks" target="_blank" rel="noreferrer">
                eslint-plugin-react-hooks
              </a>{" "}
              rules.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
