import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";

const meta = metaFor("32-usestate-vs-usereducer");

const ROWS = [
  { when: "State is a primitive or a small independent object", pick: "useState", why: "lesson 18/24 - no benefit to a switch statement for one or two fields." },
  { when: "Several related pieces of state that change together", pick: "useReducer", why: "one dispatch call can update all of them consistently, in one place." },
  { when: "The next state depends on a specific action, not just \"set to X\"", pick: "useReducer", why: "lesson 29 - 'add', 'toggle', 'remove' each need different logic, not just a new value." },
  { when: "Update logic needs its own unit tests, separate from rendering", pick: "useReducer", why: "a reducer is a plain function - test it without rendering any component." },
  { when: "You just need on/off, a counter, or a form field", pick: "useState", why: "lesson 28's reducer does the same job as a useState counter with more code." },
];

export default function UseStateVsUseReducer() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Both hooks solve the same problem (remember a value across renders, re-render when it changes) - useReducer is not a replacement for useState, it's an alternative API for the same underlying mechanism (lesson 31 proves this literally).",
        "The deciding factor is less about the DATA'S shape and more about the UPDATE LOGIC's shape: scattered, simple, one-off changes favor useState; a handful of named, meaningfully different transitions favor useReducer.",
        "It's fine to start every piece of state with useState and only refactor to useReducer once the component's setState calls start getting hard to follow - that refactor is mechanical, as lessons 25 → 29 show for the same task list.",
      ]}
      docsNote="react.dev's Extracting State Logic into a Reducer page ends with this same comparison."
    >
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>Situation</th>
              <th>Pick</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.when}>
                <td>{row.when}</td>
                <td><strong>{row.pick}</strong></td>
                <td>{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LessonLayout>
  );
}
