import type { ApiRow, DemoUser, FeatureRow } from "./types";

export const DEMO_USERS: DemoUser[] = [
  { id: "1", name: "Asha", role: "admin" },
  { id: "2", name: "David", role: "editor" },
  { id: "3", name: "Guna", role: "viewer" },
  { id: "4", name: "Meera", role: "editor" },
];

// "Can implement" for protected routes: React Router gives you <Navigate> and
// <Outlet>, but the auth check itself is your code (see ProtectedRoute in the demo).
export const REACT_VS_ROUTER: FeatureRow[] = [
  { feature: "Component rendering", react: "✅", router: "—" },
  { feature: "State management", react: "✅", router: "—" },
  { feature: "URL routing", react: "❌", router: "✅" },
  { feature: "Nested routes", react: "❌", router: "✅" },
  { feature: "Route parameters", react: "❌", router: "✅" },
  { feature: "Navigation", react: "❌", router: "✅" },
  { feature: "Protected routes", react: "❌", router: "Can implement" },
  { feature: "Browser history management", react: "❌", router: "✅" },
];

export const ROUTES_SNIPPET = `import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter basename="/customer360">
      <Routes>
        <Route element={<Layout />}>            {/* pathless layout route */}
          <Route index element={<Home />} />   {/* "/"           */}
          <Route path="users" element={<Users />} />          {/* "/users"      */}
          <Route path="users/:userId" element={<UserDetails />} /> {/* "/users/123" */}
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}> {/* guards its children */}
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`;

export const PROTECTED_SNIPPET = `function ProtectedRoute() {
  const { isLoggedIn } = useOutletContext<DemoContext>();
  const location = useLocation();

  if (!isLoggedIn) {
    // replace: the guarded URL doesn't stay in history, so Back doesn't loop
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}`;

export const API_REFERENCE: ApiRow[] = [
  // Routers
  { group: "Routers", name: "<BrowserRouter>", purpose: "Uses the browser History API - clean URLs like /users/123. basename prefixes every route (e.g. /customer360)." },
  { group: "Routers", name: "<HashRouter>", purpose: "URLs look like /#/users. Useful when the server can't send index.html for every path (e.g. plain static hosting)." },
  { group: "Routers", name: "<MemoryRouter>", purpose: "Keeps the location in memory, not the address bar. Used for tests, and for the demo on this page." },
  { group: "Routers", name: "createBrowserRouter + <RouterProvider>", purpose: "Data-router style: route objects outside React, unlocking loader, action, errorElement, useNavigation, useFetcher (see the Data APIs submenu)." },
  // Route definition
  { group: "Defining routes", name: "<Routes>", purpose: "Looks at the current URL and renders the single best-matching <Route> branch." },
  { group: "Defining routes", name: "<Route path element>", purpose: "path = the URL pattern, element = what to render. Pass props as normal: element={<Users type=\"admin\" />}." },
  { group: "Defining routes", name: "path=\":id\"", purpose: "Dynamic segment - matches /users/1, /users/25. Values arrive as strings through useParams." },
  { group: "Defining routes", name: "index", purpose: "The default child route - what renders at the parent's own URL." },
  { group: "Defining routes", name: "path=\"*\"", purpose: "Splat / catch-all, typically for a 404 page." },
  { group: "Defining routes", name: "<Outlet>", purpose: "Where a parent layout renders its matched child route. <Outlet context={...}> passes data down to it." },
  // Navigation
  { group: "Navigation", name: "<Link to>", purpose: "Client-side navigation instead of <a href>, which would do a full page reload." },
  { group: "Navigation", name: "<NavLink>", purpose: "A Link that knows if it's active: className={({ isActive }) => ...}. Add end so \"/\" isn't active on every page." },
  { group: "Navigation", name: "useNavigate()", purpose: "Navigate from code: navigate(\"/dashboard\"), navigate(-1), navigate(\"/x\", { replace: true, state })." },
  { group: "Navigation", name: "<Navigate to>", purpose: "Component version of navigate() - redirects as soon as it renders. Classic use: auth guards." },
  // Reading the URL
  { group: "Reading the URL", name: "useParams()", purpose: "Dynamic segments: /users/123 with path users/:userId gives { userId: \"123\" }." },
  { group: "Reading the URL", name: "useSearchParams()", purpose: "[searchParams, setSearchParams] for the ?query string - pagination, filters, sorting, tabs." },
  { group: "Reading the URL", name: "useLocation()", purpose: "{ pathname, search, hash, state, key } of the current entry." },
  { group: "Reading the URL", name: "useMatch(pattern)", purpose: "Returns match info (params, pathname) if the current URL matches pattern, else null." },
  { group: "Reading the URL", name: "useResolvedPath(to)", purpose: "Resolves a relative path against the current route. Rarely needed in app code." },
  { group: "Reading the URL", name: "useOutletContext()", purpose: "Reads the value a parent passed with <Outlet context={...}>." },
  // Code splitting
  { group: "Code splitting", name: "React.lazy + <Suspense>", purpose: "Works with any router style: element={<Suspense fallback={...}><Reports /></Suspense>}." },
  { group: "Code splitting", name: "route lazy", purpose: "Data-router route property that loads the route module on first visit (see the Data APIs submenu)." },
];
