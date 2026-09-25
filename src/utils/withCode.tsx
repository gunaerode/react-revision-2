/** Renders `backtick` spans in a plain string as <code> elements. */
export function withCode(text: string) {
  return text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}
