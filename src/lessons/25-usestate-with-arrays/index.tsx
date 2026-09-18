import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { INITIAL_TASKS } from "./constants";

const meta = metaFor("25-usestate-with-arrays");
let nextId = INITIAL_TASKS.length + 1;

export default function UseStateWithArrays() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [text, setText] = useState("");

  function addTask() {
    if (!text.trim()) return;
    // Add: build a NEW array with spread, don't push() onto the existing one.
    setTasks((prev) => [...prev, { id: nextId++, text, done: false }]);
    setText("");
  }

  function toggleTask(id: number) {
    // Toggle: map() to a new array, replacing only the matching item with a new object.
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function removeTask(id: number) {
    // Remove: filter() to a new array that leaves the target item out entirely.
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Arrays in state are read-only too: push, pop, splice, and sort all mutate the existing array in place, so React won't notice the change - avoid them on state arrays.",
        "Instead, always produce a new array: [...prev, item] to add, prev.filter(...) to remove, prev.map(...) to update one item while copying the rest.",
        "Each button below uses exactly one of those three patterns - together they cover the vast majority of array state updates you'll ever need.",
      ]}
      docsNote="Matches react.dev's Updating Arrays in State page and its add/remove/update/replace recipes."
    >
      <div className="side-by-side">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {" "}{task.text}
              </span>
            </label>
            <button onClick={() => removeTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </LessonLayout>
  );
}
