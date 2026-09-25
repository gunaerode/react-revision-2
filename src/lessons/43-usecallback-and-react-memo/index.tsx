import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { WithDependency, WithoutUseCallback, WithUseCallback } from "./Demos";

const meta = metaFor("43-usecallback-and-react-memo");

const HOOK_COMPARISON = [
  { hook: "useState", remembers: "a changing value", example: "const [count, setCount] = useState(0)", rerender: "Yes - calling setCount re-renders" },
  { hook: "useMemo", remembers: "a calculated value", example: "const total = useMemo(() => sum(items), [items])", rerender: "No" },
  { hook: "useCallback", remembers: "a function reference", example: "const onSave = useCallback(() => save(id), [id])", rerender: "No - and calling it doesn't either" },
];

const DECISION_STEPS = [
  { step: "Parent state changes", note: "The parent re-renders." },
  { step: "Child wrapped in memo?", note: "No → the child re-renders too, always. Yes → React compares old and new props." },
  { step: "Props the same (Object.is)?", note: "Yes → skip. No → render. Functions, objects and arrays created during render are never the same." },
  { step: "useCallback / useMemo", note: "Keep those props the same reference, so memo's comparison can actually succeed." },
];

const EQUIVALENT_SNIPPET = `useCallback(fn, deps)
// is the same as
useMemo(() => fn, deps)

// useCallback does NOT call fn - it hands fn back.
// fn runs later, when the user clicks.`;

export default function UseCallbackAndReactMemo() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "Every render runs your component function again, so const handleClick = () => {...} creates a new function each time. The code is identical, but Function A !== Function B - they are different references.",
        "Usually that doesn't matter. When a parent re-renders, its children re-render by default anyway, whatever their props are.",
        "memo(Child) changes that: React skips the child if every prop is the same (Object.is) as last time. A fresh function prop is never the same, so memo has nothing to skip and the child renders anyway (first demo).",
        "useCallback(fn, deps) returns the same function reference until a dependency changes. The prop stays equal, so memo can finally skip the child (second demo). useCallback doesn't make the function faster - it makes its identity stable.",
        "Dependencies are part of the contract. A callback that reads count must list [count], and gets a new identity whenever count changes, so the child correctly re-renders then (third demo). Leave count out and the callback keeps logging a stale count forever (lesson 21's snapshot problem).",
        "Don't wrap every function by default. Reach for it when the callback goes to a memo'd child, when it is a dependency of another hook, or when you've measured a real benefit. In this project the React Compiler usually does it for you - see the submenu.",
      ]}
      docsNote={
        <>
          All three demos opt out of the compiler with <code>"use no memo"</code>, so you see React's
          plain behaviour. In compiled code the first demo would also stay at 1.
        </>
      }
    >
      <div className="side-by-side">
        <WithoutUseCallback />
        <WithUseCallback />
        <WithDependency />
      </div>

      <p className="demo-label">When does the child re-render?</p>
      <ol className="pipeline">
        {DECISION_STEPS.map(({ step, note }) => (
          <li key={step}>
            <code>{step}</code>
            <span>{note}</span>
          </li>
        ))}
      </ol>

      <p className="demo-label">useState vs useMemo vs useCallback</p>
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>Hook</th>
              <th>Remembers</th>
              <th>Example</th>
              <th>Causes a re-render?</th>
            </tr>
          </thead>
          <tbody>
            {HOOK_COMPARISON.map((row) => (
              <tr key={row.hook}>
                <td>
                  <code>{row.hook}</code>
                </td>
                <td>{row.remembers}</td>
                <td>
                  <code>{row.example}</code>
                </td>
                <td>{row.rerender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre className="code-snippet">
        <code>{EQUIVALENT_SNIPPET}</code>
      </pre>

      <div className="info-card">
        <strong>One-line interview answer:</strong> when parent state changes the parent re-renders, and
        normally its children do too. memo lets a child skip rendering when its props are unchanged, and
        useCallback keeps a callback prop unchanged by preserving its function reference.
      </div>
    </LessonLayout>
  );
}
