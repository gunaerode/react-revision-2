export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export type TaskAction =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "remove"; id: number };
