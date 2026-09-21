export interface CounterState {
  count: number;
}

export interface IncrementAction {
  type: "increment" | "decrement";
}
