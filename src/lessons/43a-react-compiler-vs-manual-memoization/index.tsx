import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { CompiledPlainHandler, StableSubscription, UncompiledSubscription } from "./Demos";

const meta = metaFor("43a-react-compiler-vs-manual-memoization");

const COMPILER_SETUP_SNIPPET = `// vite.config.ts in this project
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});`;

const BEFORE_AFTER_SNIPPET = `// Without the compiler you'd write
const filtered = useMemo(() => filterData(data), [data]);
const handleClick = useCallback(() => doSomething(), []);

// With the compiler, plain code is enough
const filtered = filterData(data);
const handleClick = () => doSomething();`;

const OPTIONS_SNIPPET = `function Chart({ chart }) {
  const options = { animation: true, responsive: true };

  useEffect(() => {
    chart.setOptions(options);   // external, imperative API
  }, [chart, options]);          // a new object → runs every render
}

// State the intent explicitly instead of relying on the compiler:
const options = useMemo(() => ({ animation: true, responsive: true }), []);
// ...or, since it never changes, move it outside the component.`;

const BAIL_OUT_SNIPPET = `function Profile({ user }) {
  user.name = "Guna";          // ❌ mutates a prop - breaks the Rules of React
  return <div>{user.name}</div>;
}
// The compiler can't prove this is safe, so it skips the whole component
// and nothing in it is memoized. The fix isn't useMemo - it's
// const updated = { ...user, name: "Guna" };`;

const EFFECT_EVENT_SNIPPET = `// React 19.2+: useEffectEvent - for when the listener must read
// fresh props/state but must NOT re-subscribe
const onMessage = useEffectEvent((message) => {
  console.log(roomId, message);   // always the latest roomId
});

useEffect(() => {
  eventBus.subscribe(onMessage);
  return () => eventBus.unsubscribe(onMessage);
}, []);   // effect events are never dependencies`;

export default function ReactCompilerVsManualMemoization() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "React 19 did not change the fact that a new function is a new prop. What changed is tooling: the React Compiler is a build step that adds the memoization for you. React 19 and the compiler are separate things - upgrading React does nothing until the compiler is in your build. This project has it on (vite.config.ts below), which is why lesson 43 needed \"use no memo\".",
        "For routine cases - a handler passed to a memo'd child, a derived list, a JSX subtree - compiled code gets the same result as hand-written useCallback/useMemo. The first demo is lesson 43's broken case with no directive, and it just works.",
        "It can't help when it doesn't compile the component. It bails out, skipping the whole component, on code that breaks the Rules of React (mutating props or state, reading refs during render) or on patterns it can't analyse. It also skips anything marked \"use no memo\". Being on React 19 isn't a guarantee - the eslint-plugin-react-hooks compiler rules tell you when a component was skipped.",
        "When identity is part of the behaviour, not just a performance detail, say so explicitly. An external subscribe/unsubscribe API only works with the same function object (the eventBus demos). That is a semantic requirement, so useCallback there documents a contract instead of hoping the compiler happens to preserve it.",
        "In a code review for a compiled project, don't comment \"wrap this in useCallback\" just because a function is passed to a child. First check whether the compiler is on, and whether a stable identity is actually required.",
      ]}
      docsNote={
        <>
          Try it: delete <code>"use no memo"</code> from <code>UncompiledSubscription</code> in this
          lesson's Demos.tsx - the compiler then keeps handleMessage stable and the count stops climbing.
        </>
      }
    >
      <div className="side-by-side">
        <CompiledPlainHandler />
      </div>

      <p className="demo-label">Identity used outside React: an event bus</p>
      <div className="side-by-side">
        <UncompiledSubscription />
        <StableSubscription />
      </div>

      <div className="side-by-side">
        <div className="card">
          <p className="demo-label">Compiler setup (already in this repo)</p>
          <pre className="code-snippet">
            <code>{COMPILER_SETUP_SNIPPET}</code>
          </pre>
          <pre className="code-snippet">
            <code>{BEFORE_AFTER_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">Objects handed to imperative APIs</p>
          <pre className="code-snippet">
            <code>{OPTIONS_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">Code the compiler skips</p>
          <pre className="code-snippet">
            <code>{BAIL_OUT_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">The modern answer for listeners</p>
          <pre className="code-snippet">
            <code>{EFFECT_EVENT_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="info-card">
        <strong>Rule of thumb:</strong> React 19 didn't "fix" child re-renders - the React Compiler automates
        most of the memoization you used to write by hand. Keep useCallback/useMemo for the cases where a
        stable identity is part of the contract, or where the compiler can't compile the component.
      </div>
    </LessonLayout>
  );
}
