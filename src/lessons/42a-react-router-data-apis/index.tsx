import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import DataRouterDemo from "./DataRouterDemo";

const meta = metaFor("42a-react-router-data-apis");

const BEFORE_SNIPPET = `// Without a data router: every page fetches for itself
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <Spinner />;
  ...
}`;

const AFTER_SNIPPET = `const router = createBrowserRouter([
  {
    path: "/users",
    loader: async () => (await fetch("/api/users")).json(),
    action: async ({ request }) => {
      const form = await request.formData();
      await saveUser(form.get("name"));
      return { ok: true };   // loaders re-run automatically
    },
    element: <Users />,
    errorElement: <UsersError />,
  },
]);

<RouterProvider router={router} />

function Users() {
  const users = useLoaderData();         // already loaded
  const navigation = useNavigation();    // "idle" | "loading" | "submitting"
  return <Form method="post">...</Form>;
}`;

const LAZY_SNIPPET = `// v6: one function for the whole route
{ path: "/reports", lazy: () => import("./reports") }

// v7+: per property - the loader can start
// downloading without waiting for the component
{
  path: "/reports",
  lazy: {
    loader: async () => (await import("./reportsLoader")).loader,
    Component: async () => (await import("./ReportsRoute")).default,
  },
}`;

export default function ReactRouterDataApis() {
  return (
    <LessonLayout
      meta={meta}
      concept={[
        "A data router (createBrowserRouter / createMemoryRouter + <RouterProvider>) defines routes as objects outside React. The router can then do work before it renders: fetch data, handle form posts, and catch errors per route.",
        "loader runs before the route renders and useLoaderData() reads what it returned. The flow is URL → route → loader() → API → useLoaderData() → component. That removes the useEffect + loading state + error state you'd otherwise repeat in every page.",
        "action handles non-GET submissions from <Form method=\"post\"> (create, update, delete). The router passes it a real Request, you read request.formData(), and whatever it returns shows up in useActionData() - handy for validation messages. After an action, loaders on the page re-run automatically, so the UI never shows stale data.",
        "useNavigation() returns the router-wide state: idle, loading (a loader is running) or submitting (an action is running). That replaces the manual isLoading flags. useFetcher() calls a loader or action without navigating and has its own state, which fits things like a per-row Delete button.",
        "errorElement is a per-route error boundary. Throwing from a loader or action (or during render) shows the nearest errorElement. useRouteError() reads the error, and isRouteErrorResponse() tells a thrown data(\"msg\", { status: 404 }) apart from a real exception.",
        "lazy loads a route's code the first time it's visited. Open the Network tab, then click Reports in the demo: ReportsRoute and reportsLoader arrive as separate chunks.",
      ]}
      docsNote={
        <>
          The demo uses <code>createMemoryRouter</code> so it doesn't touch this page's URL. In a real app
          you'd call <code>createBrowserRouter</code> with the exact same route objects.
        </>
      }
    >
      <DataRouterDemo />

      <div className="side-by-side">
        <div className="card">
          <p className="demo-label">Declarative style - data by hand</p>
          <pre className="code-snippet">
            <code>{BEFORE_SNIPPET}</code>
          </pre>
        </div>
        <div className="card">
          <p className="demo-label">Data router style</p>
          <pre className="code-snippet">
            <code>{AFTER_SNIPPET}</code>
          </pre>
        </div>
      </div>

      <div className="card">
        <p className="demo-label">route.lazy - what the Reports link uses</p>
        <pre className="code-snippet">
          <code>{LAZY_SNIPPET}</code>
        </pre>
        <p>
          Using plain <code>&lt;Routes&gt;</code>? Wrap <code>React.lazy()</code> components in{" "}
          <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> instead. Data routers wait for lazy
          routes by themselves, so they don't need a Suspense boundary for this.
        </p>
      </div>
    </LessonLayout>
  );
}
