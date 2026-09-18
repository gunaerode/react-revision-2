import { useState } from "react";
import "./App.css";
import Sidebar from "./components/lesson/Sidebar";
import { lessons } from "./lessons/registry";

const DEFAULT_LESSON_ID = lessons[0].id;

function App() {
  const [activeId, setActiveId] = useState(DEFAULT_LESSON_ID);
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const ActiveLesson = active.Component;

  return (
    <div className="app-shell">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <main className="app-main">
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
              </a>{" "}
              and{" "}
              <a href="https://react.dev/learn/react-compiler/debugging" target="_blank" rel="noreferrer">
                React Compiler Debugging
              </a>{" "}
              - pending, next after this playlist.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
