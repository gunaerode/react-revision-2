import type { Task, TaskAction } from "./types";

let nextId = 1;

// State here is "complex": an array of objects, not a primitive. Actions are
// "complex" too: each carries a payload (text, or an id) alongside its type, the
// same array/object immutability rules from lessons 24-25 still apply inside here.
export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "add":
      return [...state, { id: nextId++, text: action.text, done: false }];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t,
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}
