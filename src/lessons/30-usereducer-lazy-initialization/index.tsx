import { useReducer, useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { counterReducer, computeInitialCount } from "./utils";

const meta = metaFor("30-usereducer-lazy-initialization");

export default function UseReducerLazyInitialization() {
  // Third argument form: useReducer(reducer, initialArg, init). React calls
  // init(initialArg) exactly once, on mount, and throws the result away on every
  // later render - it never calls init() again just because the component re-rendered.
  const [state, dispatch] = useReducer(counterReducer, 5, computeInitialCount);
  const [, forceRerender] = useState(0);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Without the third argument, useReducer(reducer, computeInitialCount(5)) would call computeInitialCount(5) on every single render, just to throw the result away except on the first one - wasted work.",
        "The lazy form separates the seed value (5) from the function that turns it into real initial state (computeInitialCount) - React only invokes that function once, on mount.",
        "Open the console and click 'force a re-render': you'll see this component re-render, but no new 'computeInitialCount() ran' log - proof the init function didn't run again.",
      ]}
      docsNote="react.dev's useReducer reference documents this as 'avoiding recreating the initial state'."
    >
      <p>count: {state.count}</p>
      <div className="side-by-side">
        <button onClick={() => dispatch("increment")}>+1</button>
        <button onClick={() => forceRerender((n) => n + 1)}>force a re-render</button>
      </div>
    </LessonLayout>
  );
}
