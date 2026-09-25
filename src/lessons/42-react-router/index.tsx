import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { API_REFERENCE, PROTECTED_SNIPPET, REACT_VS_ROUTER, ROUTES_SNIPPET } from "./constants";
import DeclarativeDemo from "./DeclarativeDemo";

const meta = metaFor("42-react-router");

const groups = Array.from(new Set(API_REFERENCE.map((row) => row.group)));

export default function ReactRouter() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "React has no built-in router - not even React 19. React renders UI and manages state; mapping a URL to a component is a library's job: React Router, Next.js routing, TanStack Router, Wouter and others. React 19's Actions, use() and Server Components are not a replacement for a client-side router.",
        "<Routes> looks at the current URL and renders the best-matching <Route>. A <Route> with no path is a layout: it renders its element around whichever child matched, and <Outlet /> marks the spot where that child goes. index is the default child, :userId is a dynamic segment, and * catches everything else.",
        "Navigate with <Link>/<NavLink>, not <a href>. A plain anchor makes the browser reload the whole page and lose all your state. NavLink also tells you whether it is active, which is what highlights the nav in the demo.",
        "From code, useNavigate() returns navigate(to, { replace, state }). navigate(-1) goes back, and replace: true swaps the current history entry instead of adding one, which is what you want after a login. <Navigate /> does the same thing as a component, so a guard can simply return it.",
        "Reading the URL: useParams() for /users/:userId (values are always strings), useSearchParams() for ?sort=desc&role=admin, useLocation() for the whole { pathname, search, hash, state, key } object, and useMatch() to test a pattern.",
        "The demo below is a real React Router app running inside a MemoryRouter, so it has its own fake address bar instead of changing this page's URL. With BrowserRouter the same routes would drive the real address bar.",
      ]}
      docsNote={
        <>
          From v7 the import is <code>"react-router"</code>. <code>react-router-dom</code> was only a
          re-export in v7 and was removed in v8, which this project now has installed (see the "What
          changed in v7 (and v8)" submenu).
        </>
      }
    >
      <p className="demo-label">React vs React Router</p>
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>React</th>
              <th>React Router</th>
            </tr>
          </thead>
          <tbody>
            {REACT_VS_ROUTER.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{row.react}</td>
                <td>{row.router}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="demo-label">Live demo - the route tree below, running for real</p>
      <DeclarativeDemo />

      <div className="side-by-side">
        <div className="card">
          <p className="demo-label">The demo's route tree (as BrowserRouter)</p>
          <pre className="code-snippet">
            <code>{ROUTES_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">Protected route = Navigate + Outlet</p>
          <pre className="code-snippet">
            <code>{PROTECTED_SNIPPET}</code>
          </pre>
          <p>
            Wrap any number of routes in it and none of them has to repeat the auth check. Click
            "Dashboard 🔒" while logged out to watch the redirect and the <code>state.from</code> hand-off.
          </p>
        </div>
      </div>

      <p className="demo-label">API reference, by what you use it for</p>
      <div className="table-scroll">
        <table className="structure-table">
          <thead>
            <tr>
              <th>API</th>
              <th>What it's for</th>
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group}>
              <tr>
                <th colSpan={2}>{group}</th>
              </tr>
              {API_REFERENCE.filter((row) => row.group === group).map((row) => (
                <tr key={row.name}>
                  <td>
                    <code>{row.name}</code>
                  </td>
                  <td>{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <div className="info-card">
        <strong>Learn in this order.</strong> First: BrowserRouter, Routes, Route, Outlet, Link, NavLink,
        useNavigate, useParams, useLocation, useSearchParams, Navigate (all on this page). Then the data
        APIs: createBrowserRouter, RouterProvider, loader, useLoaderData, action, Form, useNavigation,
        errorElement, useRouteError (next submenu).
      </div>
    </LessonLayout>
  );
}
