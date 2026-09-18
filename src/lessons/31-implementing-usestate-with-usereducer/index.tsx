import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { useMyState } from "./useMyState";

const meta = metaFor("31-implementing-usestate-with-usereducer");

export default function ImplementingUseStateWithUseReducer() {
  // Used exactly like useState - because useMyState's whole point is that it IS
  // useState, just written explicitly in terms of the more primitive useReducer.
  const [count, setCount] = useMyState(0);

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useMyState.ts implements a working [value, setter] hook using only useReducer - open it to see the whole thing is about a dozen lines.",
        "The trick: the reducer's 'action' IS the next value (or an updater function producing it, from lesson 22) - the reducer just decides whether to call that function or use the value directly.",
        "This is roughly how React's own useState is actually implemented internally - useReducer is the more fundamental primitive, and useState is a convenience wrapper around a reducer shaped exactly like this one.",
      ]}
    >
      <p>count: {count}</p>
      <div className="side-by-side">
        <button onClick={() => setCount(count + 1)}>setCount(count + 1)</button>
        <button onClick={() => setCount((c) => c + 1)}>setCount(c =&gt; c + 1)</button>
      </div>
    </LessonLayout>
  );
}
