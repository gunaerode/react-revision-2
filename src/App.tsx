import { useEffect, useState } from "react";
import "./App.css";
import LessonNav from "./components/lesson/LessonNav";
import Sidebar from "./components/lesson/Sidebar";
import { lessonLabel, neighbours, useActiveLessonId, useProgress } from "./lessons/navigation";
import { lessons } from "./lessons/registry";

const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function App() {
  const [activeId, navigate] = useActiveLessonId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { completed, isComplete, toggle } = useProgress();
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const ActiveLesson = active.Component;
  const { index, prev, next } = neighbours(active.id);

  // data-theme goes on the root <html> element (not some wrapper div) so
  // index.css can style <body>'s own background/text color from the same
  // selector, rather than only the div tree React renders into.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  // New lesson: start at the top and show its name in the browser tab.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = `${lessonLabel(active)}. ${active.title} · React 19 Tutorial`;
  }, [active]);

  // ← / → move between lessons, unless you're typing somewhere.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key === "ArrowLeft" && prev) navigate(prev.id);
      if (e.key === "ArrowRight" && next) navigate(next.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, navigate]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  const percentThrough = Math.round(((index + 1) / lessons.length) * 100);

  return (
    <div className="app-shell">
      <Sidebar
        activeId={active.id}
        onSelect={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        completed={completed}
      />
      <div className="app-body">
        <header className="topbar">
          {/* Only visible below the mobile breakpoint - the sidebar is static above it. */}
          <button
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open lesson menu"
          >
            ☰
          </button>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-section">{active.section}</span>
            <span aria-hidden="true">/</span>
            <span className="breadcrumb-current">{active.title}</span>
          </nav>
          <span className="topbar-position">
            {index + 1} of {lessons.length}
          </span>
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <div className="topbar-progress" style={{ width: `${percentThrough}%` }} aria-hidden="true" />
        </header>

        <main className="app-main">
          {/* key: every lesson mounts fresh, so demo state never leaks between lessons. */}
          <ActiveLesson key={active.id} />

          <LessonNav
            prev={prev}
            next={next}
            isComplete={isComplete(active.id)}
            onToggleComplete={() => toggle(active.id)}
            onSelect={navigate}
          />

          <footer className="extras-note">
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
                <a href="https://react.dev/reference/react/useLayoutEffect" target="_blank" rel="noreferrer">
                  useLayoutEffect
                </a>
                ,{" "}
                <a
                  href="https://react.dev/reference/react/useInsertionEffect"
                  target="_blank"
                  rel="noreferrer"
                >
                  useInsertionEffect
                </a>
                ,{" "}
                <a href="https://react.dev/reference/react/useEffectEvent" target="_blank" rel="noreferrer">
                  useEffectEvent
                </a>
                ,{" "}
                <a
                  href="https://react.dev/reference/react/useImperativeHandle"
                  target="_blank"
                  rel="noreferrer"
                >
                  useImperativeHandle
                </a>
                ,{" "}
                <a href="https://react.dev/reference/react/useId" target="_blank" rel="noreferrer">
                  useId
                </a>
                ,{" "}
                <a
                  href="https://react.dev/reference/react/useSyncExternalStore"
                  target="_blank"
                  rel="noreferrer"
                >
                  useSyncExternalStore
                </a>
                ,{" "}
                <a href="https://react.dev/reference/react/useDebugValue" target="_blank" rel="noreferrer">
                  useDebugValue
                </a>
                ,{" "}
                <a href="https://react.dev/reference/react/useActionState" target="_blank" rel="noreferrer">
                  useActionState
                </a>
                ,{" "}
                <a
                  href="https://react.dev/reference/react-dom/hooks/useFormStatus"
                  target="_blank"
                  rel="noreferrer"
                >
                  useFormStatus
                </a>
                , and the{" "}
                <a
                  href="https://react.dev/reference/eslint-plugin-react-hooks"
                  target="_blank"
                  rel="noreferrer"
                >
                  eslint-plugin-react-hooks
                </a>{" "}
                rules.
              </li>
            </ul>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
