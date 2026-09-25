import {
  Component,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import CodeEditor from "./CodeEditor";
import { compile } from "./compile";
import { createConsole, evaluate, type LogEntry, type LogLevel } from "./evaluate";

interface LiveRunnerProps {
  /** The starting code. "Reset" goes back to this. */
  code: string;
  /** Used for aria labels and the storage key that remembers your edits. */
  id: string;
}

type Status = "loading" | "ready" | "error";

// Catches errors thrown while the example renders, so a typo in the playground
// shows a message instead of crashing the whole lesson page.
class PreviewBoundary extends Component<
  { children: ReactNode; onError: (message: string) => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(`${error.name}: ${error.message}`);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Memoized so that the runner's own state changes (new console logs, status,
// copy button...) never re-render the example. Without this, an example that
// logs during render would log -> update the log panel -> re-render -> log...
const Preview = memo(function Preview({
  Example,
  onError,
}: {
  Example: ComponentType;
  onError: (message: string) => void;
}) {
  return (
    <PreviewBoundary onError={onError}>
      <Example />
    </PreviewBoundary>
  );
});

const STORAGE_PREFIX = "playground:";

function readSaved(id: string): string | null {
  try {
    return localStorage.getItem(STORAGE_PREFIX + id);
  } catch {
    return null;
  }
}

export default function LiveRunner({ code: initialCode, id }: LiveRunnerProps) {
  const [code, setCode] = useState(() => readSaved(id) ?? initialCode);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [example, setExample] = useState<{ C: ComponentType } | null>(null);
  const [runId, setRunId] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"code" | "preview">("code");
  const logId = useRef(0);
  const edited = code !== initialCode;

  const addLog = useCallback((level: LogLevel, text: string) => {
    // Logs can arrive during render; defer so we never set state mid-render.
    queueMicrotask(() => setLogs((prev) => [...prev.slice(-49), { id: ++logId.current, level, text }]));
  }, []);

  const run = useCallback(
    async (source: string) => {
      const result = await compile(source);
      if (result.error) {
        setError(result.error);
        setStatus("error");
        return;
      }
      try {
        const C = evaluate(result.js, createConsole(addLog));
        setLogs([]);
        setError(null);
        setExample({ C });
        setRunId((n) => n + 1); // new key -> fresh mount, fresh state, effects cleaned up
        setStatus("ready");
      } catch (e) {
        setError(e instanceof Error ? `${e.name}: ${e.message}` : String(e));
        setStatus("error");
      }
    },
    [addLog],
  );

  // Re-run shortly after typing stops. The first run also loads the compiler.
  useEffect(() => {
    const t = setTimeout(() => void run(code), 350);
    return () => clearTimeout(t);
  }, [code, run]);

  useEffect(() => {
    try {
      if (edited) localStorage.setItem(STORAGE_PREFIX + id, code);
      else localStorage.removeItem(STORAGE_PREFIX + id);
    } catch {
      /* storage unavailable (private mode) - edits just won't persist */
    }
  }, [code, edited, id]);

  function reset() {
    setCode(initialCode);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  }

  const showError = useCallback((message: string) => {
    setError(message);
    setStatus("error");
  }, []);

  const Example = example?.C;

  return (
    <div className={`runner runner-show-${mobileTab}`}>
      <div className="runner-toolbar">
        <div className="runner-tabs" role="tablist" aria-label="Playground view">
          <button role="tab" aria-selected={mobileTab === "code"} onClick={() => setMobileTab("code")}>
            Code
          </button>
          <button role="tab" aria-selected={mobileTab === "preview"} onClick={() => setMobileTab("preview")}>
            Preview
          </button>
        </div>
        <span className="runner-file">
          App.tsx
          {edited && (
            <span className="runner-edited" title="Edited - saved in this browser">
              {" "}
              ●
            </span>
          )}
        </span>
        <div className="runner-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => void run(code)} title="Run (Ctrl+Enter)">
            ▶ Run
          </button>
          <button className="btn btn-ghost btn-sm" onClick={copy}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={reset}
            disabled={!edited}
            title="Back to the original example"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <div className="runner-panes">
        <div className="runner-pane runner-code">
          <CodeEditor
            value={code}
            onChange={setCode}
            onRun={() => void run(code)}
            ariaLabel={`Playground code for ${id}`}
          />
        </div>

        <div className="runner-pane runner-output">
          <div className="runner-pane-label">
            <span>Preview</span>
            <span className={`runner-status runner-status-${status}`}>
              {status === "loading" ? "Loading compiler…" : status === "error" ? "Error" : "Live"}
            </span>
          </div>
          <div className="runner-preview">
            {status === "loading" && !Example && <div className="runner-skeleton" />}
            {Example && <Preview key={runId} Example={Example} onError={showError} />}
          </div>
          {error && (
            <pre className="runner-error" role="alert">
              {error}
            </pre>
          )}
          <div className="runner-console">
            <div className="runner-pane-label">
              <span>Console</span>
              {logs.length > 0 && (
                <button className="btn btn-ghost btn-xs" onClick={() => setLogs([])}>
                  Clear
                </button>
              )}
            </div>
            {logs.length === 0 ? (
              <p className="runner-console-empty">console.log output shows up here</p>
            ) : (
              <ul>
                {logs.map((log) => (
                  <li key={log.id} className={`log-${log.level}`}>
                    {log.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
