// State here is "simple": a bare number, not an object. Actions are "simple" too:
// plain string literals, no extra payload data attached to them.
export type CounterAction = "increment" | "decrement" | "reset";
