import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { FilterWithMemo, FilterWithoutMemo, ObjectPropWithMemo, ObjectPropWithoutMemo } from "./Demos";

const meta = metaFor("44-usememo-hook");

const SYNTAX_SNIPPET = `const visible = useMemo(
  () => filterProducts(products, query),  // calculate - must be pure
  [products, query],                      // re-run only when these change
);`;

const PITFALLS_SNIPPET = `// ❌ returns undefined - the braces are a function body
useMemo(() => { color: "teal" }, []);
// ✅ wrap an object literal in parentheses
useMemo(() => ({ color: "teal" }), []);

// ❌ missing dependency - stays stuck on the first query
useMemo(() => filter(items, query), [items]);

// ❌ side effects don't belong here - use an event handler or useEffect
useMemo(() => { fetch("/api/log"); return x; }, [x]);

// ❌ not worth it - cheap work costs more to cache than to redo
const fullName = useMemo(() => first + " " + last, [first, last]);
const fullName = first + " " + last;   // ✅ just compute it`;

const WHEN_TO_USE = [
  { when: "The calculation is noticeably slow", example: "Filtering/sorting thousands of rows, parsing, heavy maths", why: "Skip redoing it when unrelated state changes." },
  { when: "The value is a prop of a memo'd child", example: "An options object, a filtered array", why: "Keep the same reference so memo can skip the child." },
  { when: "The value is a hook dependency", example: "An object used in a useEffect dependency array", why: "Stop the effect from re-running on every render." },
];

export default function UseMemoHook() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "useMemo(calculate, deps) caches the result of calculate between re-renders. On later renders React compares each dependency with Object.is: if none changed it hands back the cached value without calling calculate, and if any changed it runs calculate again and caches the new result.",
        "Reason 1 - skip slow work. A re-render re-runs every line of the component, including an expensive filter, even when the change (a counter, a theme toggle) had nothing to do with it. In the first pair of demos, click \"Unrelated state\": without useMemo slowFilter runs again and every click lags. With it, the count doesn't move.",
        "Reason 2 - keep a reference stable. An object or array literal is a new reference every render, exactly like the functions in lesson 43, so a memo'd child that receives it always re-renders. Memoizing the object (second pair) lets memo skip the child until a real dependency changes.",
        "useMemo remembers a value and useCallback remembers a function - useCallback(fn, deps) is just useMemo(() => fn, deps). Neither causes a re-render, unlike useState.",
        "Treat it as a performance hint, not a guarantee. React may throw a cache away (for example, a component that suspends before mounting starts fresh), so your code must still be correct if calculate runs again. That's why calculate has to be pure.",
        "With the React Compiler on (as in this project) most of this happens automatically, so these demos opt out with \"use no memo\" to show React's plain behaviour. Measure first: wrapping cheap work just adds overhead and noise.",
      ]}
      docsNote={
        <>
          Useful test from react.dev: wrap the calculation in <code>console.time</code> /{" "}
          <code>console.timeEnd</code>. If it takes around 1ms or more, memoizing it can be worth it.
        </>
      }
    >
      <p className="demo-label">Reason 1 - skip an expensive calculation (5,000 products, ~40ms per filter)</p>
      <div className="side-by-side">
        <FilterWithoutMemo />
        <FilterWithMemo />
      </div>

      <p className="demo-label">Reason 2 - a stable object for a memo'd child</p>
      <div className="side-by-side">
        <ObjectPropWithoutMemo />
        <ObjectPropWithMemo />
      </div>

      <p className="demo-label">When useMemo is worth it</p>
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Example</th>
              <th>What it buys you</th>
            </tr>
          </thead>
          <tbody>
            {WHEN_TO_USE.map((row) => (
              <tr key={row.when}>
                <td>{row.when}</td>
                <td>{row.example}</td>
                <td>{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="side-by-side">
        <div className="card">
          <p className="demo-label">Syntax</p>
          <pre className="code-snippet">
            <code>{SYNTAX_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">Common mistakes</p>
          <pre className="code-snippet">
            <code>{PITFALLS_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="info-card">
        <strong>Simple rule:</strong> useState → store changing data. useMemo → remember a calculated value.
        useCallback → remember a function reference (lesson 43).
      </div>
    </LessonLayout>
  );
}
