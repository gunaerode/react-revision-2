import { useState } from "react";
import { INITIAL_TASKS } from "./constants";

interface TaskInputListProps {
  useIndexAsKey: boolean;
}

// Inputs are uncontrolled (defaultValue, no onChange) on purpose: what's on screen
// is the browser's own DOM state, not React state. That's what makes the key bug
// visible - if these were controlled inputs synced to React state every keystroke,
// React would overwrite the DOM value on every render regardless of key.
export default function TaskInputList({ useIndexAsKey }: TaskInputListProps) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function removeFirst() {
    setTasks((prev) => prev.slice(1));
  }

  return (
    <div className="card">
      <p className="demo-label">
        key = {useIndexAsKey ? "array index" : "task.id"}
      </p>
      {tasks.map((task, index) => (
        <input
          key={useIndexAsKey ? index : task.id}
          defaultValue={task.text}
          style={{ display: "block", marginBottom: 4, width: "100%" }}
        />
      ))}
      <button onClick={removeFirst} disabled={tasks.length === 0}>
        Remove first item
      </button>
    </div>
  );
}
