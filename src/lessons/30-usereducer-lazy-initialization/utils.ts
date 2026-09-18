export interface CounterState {
  count: number;
}

export function counterReducer(state: CounterState, action: "increment"): CounterState {
  return action === "increment" ? { count: state.count + 1 } : state;
}

// An "expensive" computation, standing in for something like parsing a large
// payload or reading from localStorage. Logged so you can see exactly when it runs.
export function computeInitialCount(seed: number): CounterState {
  console.log("computeInitialCount() ran - this should only happen once, on mount");
  return { count: seed * 10 };
}
