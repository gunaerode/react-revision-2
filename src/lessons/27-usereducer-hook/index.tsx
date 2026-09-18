import { useReducer } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { counterReducer } from "./utils";

const meta = metaFor("27-usereducer-hook");

export default function UseReducerHook() {
  // useReducer(reducer, initialState) returns the same kind of [value, updater]
  // pair as useState - but the updater is `dispatch`, and instead of handing it a
  // new value directly, you hand it an action describing WHAT HAPPENED.
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useReducer moves the 'how does state change' logic out of the component and into a standalone reducer function, which the component calls dispatch to invoke.",
        "Instead of setCount(count + 1), you dispatch({ type: 'increment' }) - the component describes an event that happened, and the reducer decides what that means for state.",
        "For one action type this is more ceremony than useState for no real benefit - the payoff shows up in lesson 29, once there are several related actions to keep straight.",
      ]}
      docsNote="Matches the useReducer reference page and react.dev's Extracting State Logic into a Reducer guide."
    >
      <p>count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        dispatch({"{"} type: "increment" {"}"})
      </button>
    </LessonLayout>
  );
}
