import type { CounterState, IncrementAction } from "./types";

// A reducer is a pure function: (currentState, action) => nextState. It never calls
// setState, never mutates currentState, and never causes side effects - given the
// same inputs it always returns the same output, which is what makes state updates
// predictable and easy to test in isolation from any component.
export function counterReducer(
  state: CounterState,
  action: IncrementAction,
): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}
