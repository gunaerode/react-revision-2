import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { MIGRATION_STEPS, MODES, V7_CHANGES, V8_CHANGES } from "./constants";

const meta = metaFor("42b-react-router-v7-and-v8");

export default function ReactRouterV7AndV8() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "v7 is an evolution of v6, not a rewrite. Routes, Link, Outlet, useParams and the rest of lesson 42 work the same. Most of the change is in packaging, and in how much more the router can take over if you let it.",
        "The central idea is three modes: Declarative (what most v6 apps use), Data (loaders and actions, from the previous submenu), and Framework (a Vite plugin that adds generated types, code splitting and optional SSR). Moving up a mode is optional.",
        "v7 also integrates with React 19. Navigations run as transitions by default, which in v6 needed a future flag.",
        "v8 is out now, and it's what npm installed for these lessons (react-router 8.x). It mostly deletes things v7 had already deprecated behind future flags, so an app with every v7 flag on is already most of the way there.",
      ]}
      docsNote={
        <>
          Official upgrade guides:{" "}
          <a href="https://reactrouter.com/upgrading/v6" target="_blank" rel="noreferrer">v6 → v7</a> and the{" "}
          <a href="https://github.com/remix-run/react-router/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">
            changelog
          </a>{" "}
          for v8.
        </>
      }
    >
      <p className="demo-label">The three modes</p>
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>How you set it up</th>
              <th>What you get</th>
            </tr>
          </thead>
          <tbody>
            {MODES.map((row) => (
              <tr key={row.mode}>
                <td>
                  <strong>{row.mode}</strong>
                </td>
                <td>
                  <code>{row.setup}</code>
                </td>
                <td>{row.gives}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="demo-label">What changed in v7</p>
      <div className="side-by-side">
        {V7_CHANGES.map((change) => (
          <div key={change.title} className="card" style={{ flex: "1 1 280px" }}>
            <strong>{change.title}</strong>
            <p>{change.body}</p>
            {change.code && (
              <pre className="code-snippet">
                <code>{change.code}</code>
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="info-card">
        <strong>And then v8 removed…</strong>
        <ul>
          {V8_CHANGES.map((change) => (
            <li key={change}>{change}</li>
          ))}
        </ul>
      </div>

      <p className="demo-label">A practical migration path for an existing v6 app</p>
      <ol className="pipeline">
        {MIGRATION_STEPS.map(({ step, note }) => (
          <li key={step}>
            <code>{step}</code>
            <span>{note}</span>
          </li>
        ))}
      </ol>
    </LessonLayout>
  );
}
