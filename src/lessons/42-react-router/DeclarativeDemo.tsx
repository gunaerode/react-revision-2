import { useState } from "react";
import {
  MemoryRouter,
  Navigate,
  NavLink,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router";
import AddressBar from "./AddressBar";
import { DEMO_USERS } from "./constants";
import type { DemoContext } from "./types";
import "./RouterDemo.css";

// MemoryRouter rather than BrowserRouter: this whole learn app is one page on
// GitHub Pages, so the demo keeps its URL in memory and shows it in the fake
// address bar below instead of touching the real one.
export default function DeclarativeDemo() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <AddressBar />
      <Routes>
        <Route element={<DemoLayout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetails />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

function DemoLayout() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const context: DemoContext = { isLoggedIn, setLoggedIn, currentUser: DEMO_USERS[2] };

  return (
    <div className="router-demo">
      <nav className="router-demo-nav">
        {/* end: without it "/" would count as active on every page. */}
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/dashboard">Dashboard 🔒</NavLink>
        <NavLink to="/does-not-exist">Broken link</NavLink>
        <span className="router-demo-auth">{isLoggedIn ? "logged in" : "logged out"}</span>
      </nav>
      <div className="router-demo-page">
        <Outlet context={context} />
      </div>
      <p className="demo-label">useLocation()</p>
      <pre className="code-snippet">
        <code>
          {JSON.stringify(
            { pathname: location.pathname, search: location.search, hash: location.hash, state: location.state, key: location.key },
            null,
            2,
          )}
        </code>
      </pre>
    </div>
  );
}

function Home() {
  const { currentUser } = useOutletContext<DemoContext>();
  return (
    <>
      <h3>Home (index route)</h3>
      <p>
        Hello {currentUser.name} - this greeting came from the layout through <code>useOutletContext()</code>.
      </p>
      <p>
        Try the Users link, open a user, then use ← → in the address bar. You can also type a URL
        such as <code>/users/2?tab=posts</code> into it and press Enter.
      </p>
    </>
  );
}

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") === "desc" ? "desc" : "asc";
  const role = searchParams.get("role") ?? "all";

  const visible = DEMO_USERS.filter((u) => role === "all" || u.role === role).toSorted((a, b) =>
    sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  );

  // Passing a function keeps the other params. Passing a plain object would
  // replace the whole query string.
  function update(key: string, value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "all") next.delete(key);
      else next.set(key, value);
      return next;
    });
  }

  return (
    <>
      <h3>Users</h3>
      <div className="side-by-side">
        <label>
          sort{" "}
          <select value={sort} onChange={(e) => update("sort", e.target.value)}>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </label>
        <label>
          role{" "}
          <select value={role} onChange={(e) => update("role", e.target.value)}>
            <option value="all">all</option>
            <option value="admin">admin</option>
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
          </select>
        </label>
      </div>
      <p>Both dropdowns live in the query string (useSearchParams), so the list state survives Back/Forward.</p>
      <ul>
        {visible.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link> - {u.role}
          </li>
        ))}
        <li>
          <Link to="/users/99">A user that doesn't exist</Link>
        </li>
      </ul>
    </>
  );
}

function UserDetails() {
  const { userId } = useParams();
  const match = useMatch("/users/:userId");
  const navigate = useNavigate();
  const user = DEMO_USERS.find((u) => u.id === userId);

  return (
    <>
      <h3>UserDetails</h3>
      <p>
        <code>useParams()</code> → <code>{JSON.stringify({ userId })}</code> (always a string - convert it
        yourself if you need a number).
      </p>
      <p>
        <code>useMatch("/users/:userId")</code> → pattern matched <code>{match?.pathname}</code>
      </p>
      {user ? <p>Found: <strong>{user.name}</strong> ({user.role})</p> : <p>No user with id {userId}.</p>}
      <button onClick={() => navigate(-1)}>← navigate(-1)</button>
    </>
  );
}

function Login() {
  const { isLoggedIn, setLoggedIn } = useOutletContext<DemoContext>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  function logIn() {
    setLoggedIn(true);
    // replace: after logging in, Back shouldn't return to the login page.
    navigate(from, { replace: true });
  }

  return (
    <>
      <h3>Login</h3>
      {location.state ? (
        <p>
          ProtectedRoute redirected you here and passed <code>state.from = "{from}"</code>.
        </p>
      ) : null}
      {isLoggedIn ? (
        <button onClick={() => setLoggedIn(false)}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in, then navigate("{from}", {"{ replace: true }"})</button>
      )}
    </>
  );
}

function ProtectedRoute() {
  const context = useOutletContext<DemoContext>();
  const location = useLocation();

  if (!context.isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  // This route has its own Outlet, so it forwards the layout's context to it.
  return <Outlet context={context} />;
}

function Dashboard() {
  const { setLoggedIn } = useOutletContext<DemoContext>();
  const navigate = useNavigate();
  return (
    <>
      <h3>Dashboard 🔒</h3>
      <p>You only see this because ProtectedRoute rendered its Outlet.</p>
      <button
        onClick={() => {
          setLoggedIn(false);
          navigate("/");
        }}
      >
        Log out
      </button>
    </>
  );
}

function NotFound() {
  const location = useLocation();
  return (
    <>
      <h3>404</h3>
      <p>
        Nothing matched <code>{location.pathname}</code>, so the <code>path="*"</code> route rendered.
      </p>
      <Link to="/">Go home</Link>
    </>
  );
}
