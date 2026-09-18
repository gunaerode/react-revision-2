import { useReducer, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { tasksReducer } from "./utils";

const meta = metaFor("29-usereducer-complex-state-and-actions");

export default function UseReducerComplexStateAndActions() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [text, setText] = useState("");

  function addTask() {
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText("");
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Actions carry a payload: { type: 'add', text } and { type: 'toggle', id } both flow through the same dispatch, but each brings exactly the data its case in the reducer needs.",
        "Compare this to lesson 25's version of the same task list built with useState directly - the component code here is shorter (no inline setTasks((prev) => ...) calls) because the update logic moved to utils.ts.",
        "TypeScript's discriminated union for TaskAction (see types.ts) means the switch statement gets autocomplete and type-checking per case - action.text is only valid inside the 'add' branch.",
      ]}
    >
      <div className="side-by-side">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />
        <button onClick={addTask}>dispatch(add)</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: "toggle", id: task.id })}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {" "}{task.text}
              </span>
            </label>
            <button onClick={() => dispatch({ type: "remove", id: task.id })}>✕</button>
          </li>
        ))}
      </ul>
    </LessonLayout>
  );
}
