import type { Note } from "./types";

// A pretend backend: module-level data plus artificial latency, so the pending
// states (useNavigation, fetcher.state) are actually visible in the demo.

let notes: Note[] = [
  { id: "1", title: "Loaders run before the route renders" },
  { id: "2", title: "Actions handle <Form method=\"post\">" },
];
let nextId = 3;

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function listNotes(): Note[] {
  return [...notes];
}

export function getNote(id: string | undefined): Note | undefined {
  return notes.find((n) => n.id === id);
}

export function addNote(title: string): void {
  notes = [...notes, { id: String(nextId++), title }];
}

export function deleteNote(id: string): void {
  notes = notes.filter((n) => n.id !== id);
}
