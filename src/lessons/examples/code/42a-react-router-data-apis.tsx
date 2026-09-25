import { useState } from "react";
import {
  createMemoryRouter, Form, Link, Outlet, RouterProvider,
  useLoaderData, useNavigation, useRouteError,
} from "react-router";

// Data routers load data BEFORE rendering a route (loader), handle form
// submissions (action), and show an errorElement when something throws.

let todos = ["Learn loaders", "Learn actions"];
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function todosLoader() {
  await wait(500); // pretend network
  return { todos };
}

async function addTodoAction({ request }: { request: Request }) {
  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  if (title === "boom") throw new Error("The server exploded 💥");
  if (title) todos = [...todos, title];
  return null; // after an action, loaders re-run automatically
}

function Root() {
  const navigation = useNavigation();
  return (
    <div>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        {navigation.state !== "idle" && <span>⏳ {navigation.state}…</span>}
      </nav>
      <Outlet />
    </div>
  );
}

function Todos() {
  const { todos } = useLoaderData() as { todos: string[] };
  return (
    <>
      <ul>{todos.map((t) => <li key={t}>{t}</li>)}</ul>
      <Form method="post">
        <input name="title" placeholder='New todo (try "boom")' />{" "}
        <button type="submit">Add</button>
      </Form>
    </>
  );
}

function ErrorPage() {
  const error = useRouteError() as Error;
  return <p style={{ color: "crimson" }}>⚠️ {error.message} - <Link to="/">go home</Link></p>;
}

function makeRouter() {
  return createMemoryRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <p>Pick "Todos" to run the loader.</p> },
        { path: "todos", loader: todosLoader, action: addTodoAction, element: <Todos /> },
      ],
    },
  ]);
}

export default function App() {
  const [router] = useState(makeRouter); // create the router once
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <RouterProvider router={router} />
    </div>
  );
}
