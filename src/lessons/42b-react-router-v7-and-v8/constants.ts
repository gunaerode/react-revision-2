import type { ModeRow, VersionChange } from "./types";

export const MODES: ModeRow[] = [
  {
    mode: "Declarative",
    setup: "<BrowserRouter> + <Routes>/<Route>",
    gives: "URL matching, Link/NavLink, useNavigate, useParams, useLocation, useSearchParams",
  },
  {
    mode: "Data",
    setup: "createBrowserRouter([...]) + <RouterProvider>",
    gives: "Everything above + loader, action, useLoaderData/useActionData, useNavigation, useFetcher, errorElement, lazy",
  },
  {
    mode: "Framework",
    setup: "@react-router/dev Vite plugin + routes.ts + route modules",
    gives: "Everything above + generated route types, automatic code splitting, SSR / static pre-rendering, scroll restoration",
  },
];

export const V7_CHANGES: VersionChange[] = [
  {
    title: "One package: react-router",
    body: "react-router-dom was merged into react-router. In v7, react-router-dom still existed as a re-export so old imports kept working. DOM-only pieces like RouterProvider with flushSync come from react-router/dom.",
    code: `// v6
import { Link, useNavigate } from "react-router-dom";
// v7+
import { Link, useNavigate } from "react-router";`,
  },
  {
    title: "Three modes, one library",
    body: "Declarative, Data and Framework modes are all official now. You pick how much of the app the router controls, and you can move up one mode at a time.",
  },
  {
    title: "React 19 transitions by default",
    body: "Router state updates are wrapped in React.startTransition. In v6 that needed the future.v7_startTransition flag. Navigations become non-blocking React transitions.",
  },
  {
    title: "Type-safe route modules",
    body: "In Framework mode the router generates types per route (./+types/users), so params, loaderData and actionData are typed from the route itself instead of hand-written interfaces.",
    code: `import type { Route } from "./+types/user";

export async function loader({ params }: Route.LoaderArgs) {
  return getUser(params.userId); // userId: string, typed
}

export default function User({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}`,
  },
  {
    title: "Automatic code splitting",
    body: "Framework mode splits every route module into its own chunk. The browser downloads a page's code only when the user navigates to it.",
  },
  {
    title: "Granular route.lazy",
    body: "lazy can now be an object of per-property loaders ({ loader, action, Component, ... }), so a route's data code no longer has to wait for its UI code. The Data APIs demo uses it.",
  },
  {
    title: "Lazy route discovery",
    body: "Framework mode no longer has to ship the whole route manifest up front. The router discovers routes as links render or the user navigates. Later 7.x releases made the manifest path configurable and let you turn discovery off.",
  },
  {
    title: "Middleware (behind a flag)",
    body: "Code that runs around loaders and actions - auth, logging, authorization, shared context - was introduced as future.v8_middleware so apps could adopt it before v8.",
    code: `Request → middleware → loader/action → response → middleware → client`,
  },
];

export const V8_CHANGES: string[] = [
  "The react-router-dom package is removed. Import everything from react-router (and react-router/dom for DOM-specific entry points).",
  "Middleware is always on. The future.v8_middleware flag is gone.",
  "The remaining future.v8_* flags became the default behaviour, e.g. loaders and actions always receive the raw request.",
  "Packages are ESM-only.",
  "Minimum versions went up: React 19.2.7 and Node 22.22.",
];

export const MIGRATION_STEPS: { step: string; note: string }[] = [
  { step: "v6 + future flags", note: "Turn on the v7_* future flags one at a time and fix warnings while still on v6." },
  { step: "Upgrade to v7", note: "Swap react-router-dom imports for react-router. Existing <Routes>/<Route> keep working as-is." },
  { step: "Adopt createBrowserRouter", note: "Move the route tree into objects - behaviour is unchanged, but the data APIs are now available." },
  { step: "Loaders / actions", note: "Convert pages one at a time, starting with the ones that have the most useEffect fetching." },
  { step: "v8 + future flags", note: "Enable the v8_* flags (middleware, etc.) on v7, then upgrade to v8." },
  { step: "Framework mode (optional)", note: "Only if you want generated types, SSR / pre-rendering or automatic splitting." },
];
