import type { CounterAction } from "./types";

export function counterReducer(state: number, action: CounterAction): number {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}
