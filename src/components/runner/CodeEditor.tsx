import { useMemo, type KeyboardEvent } from "react";
import { highlight } from "./highlight";

interface CodeEditorProps {
  value: string;
  onChange: (next: string) => void;
  /** Ctrl/Cmd + Enter or Ctrl/Cmd + S. */
  onRun?: () => void;
  readOnly?: boolean;
  ariaLabel?: string;
}

const INDENT = "  ";

/**
 * A transparent <textarea> laid exactly over a syntax-highlighted <pre>. The
 * textarea handles typing, selection, undo and accessibility; the <pre> behind
 * it only paints the colours. Both share font and padding, neither wraps, and
 * the <pre> sets the size of the layer they sit in, so they never drift apart.
 */
export default function CodeEditor({ value, onChange, onRun, readOnly, ariaLabel }: CodeEditorProps) {
  const html = useMemo(() => highlight(value), [value]);
  const lineCount = value.split("\n").length;

  // execCommand("insertText") keeps the browser's native undo/redo history
  // intact (Ctrl+Z works). If a browser doesn't support it, fall back to
  // rewriting the value directly.
  function insert(el: HTMLTextAreaElement, text: string, from: number, to: number) {
    el.setSelectionRange(from, to);
    const ok = text ? document.execCommand("insertText", false, text) : document.execCommand("delete", false);
    if (!ok) {
      onChange(value.slice(0, from) + text + value.slice(to));
      requestAnimationFrame(() => el.setSelectionRange(from + text.length, from + text.length));
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    if ((e.ctrlKey || e.metaKey) && (e.key === "Enter" || e.key === "s")) {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (readOnly) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;

    if (e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey) {
      // Tab indents instead of leaving the editor. Press Esc first to Tab out,
      // so keyboard users are never trapped.
      e.preventDefault();
      if (e.shiftKey) {
        if (value.startsWith(INDENT, lineStart)) {
          insert(el, "", lineStart, lineStart + INDENT.length);
        }
        return;
      }
      insert(el, INDENT, start, end);
      return;
    }
    if (e.key === "Escape") {
      el.blur();
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      // Keep the current line's indentation, and add a level after { ( [ or >.
      e.preventDefault();
      const currentIndent = /^[ \t]*/.exec(value.slice(lineStart, start))?.[0] ?? "";
      const before = value.slice(0, start).trimEnd();
      const extra = /[{([>]$/.test(before) && !/\/>$/.test(before) ? INDENT : "";
      insert(el, "\n" + currentIndent + extra, start, end);
    }
  }

  return (
    <div className="code-editor">
      <div className="code-editor-gutter" aria-hidden="true">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="code-editor-body">
        <div className="code-editor-layer">
          <pre
            className="code-editor-highlight"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <textarea
            className="code-editor-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            aria-label={ariaLabel ?? "Code editor"}
          />
        </div>
      </div>
    </div>
  );
}
