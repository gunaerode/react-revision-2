import { useReducer } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { counterReducer } from "./utils";

const meta = metaFor("28-usereducer-simple-state-and-action");

export default function UseReducerSimpleStateAndAction() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "State doesn't have to be an object - count here is a plain number, and dispatch's argument doesn't have to be an object either, it's just the string 'increment' | 'decrement' | 'reset'.",
        "The switch statement in counterReducer.ts is the entire update logic for this component, in one place, fully readable without hunting through JSX for scattered setCount calls.",
        "Notice all three buttons dispatch to the SAME function - adding a fourth action later means adding one more case, not one more piece of state-setting logic sprinkled through the component.",
      ]}
    >
      <p>count: {count}</p>
      <div className="side-by-side">
        <button onClick={() => dispatch("increment")}>+1</button>
        <button onClick={() => dispatch("decrement")}>-1</button>
        <button onClick={() => dispatch("reset")}>reset</button>
      </div>
    </LessonLayout>
  );
}
