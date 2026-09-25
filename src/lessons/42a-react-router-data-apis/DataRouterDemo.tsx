import { useState } from "react";
import {
  createMemoryRouter,
  data,
  Form,
  isRouteErrorResponse,
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import AddressBar from "../42-react-router/AddressBar";
import "../42-react-router/RouterDemo.css";
import type { Note } from "./types";
import { addNote, delay, deleteNote, getNote, listNotes } from "./utils";

async function notesLoader() {
  await delay(600);
  return { notes: listNotes(), loadedAt: new Date().toLocaleTimeString() };
}

async function notesAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await delay(500);

  if (formData.get("intent") === "delete") {
    deleteNote(String(formData.get("id")));
    return { error: null };
  }
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };
  addNote(title);
  return { error: null };
}

async function noteLoader({ params }: LoaderFunctionArgs) {
  await delay(400);
  const note = getNote(params.noteId);
  // Throwing (not returning) skips the component and renders the nearest errorElement.
  if (!note) throw data(`No note with id "${params.noteId}"`, { status: 404 });
  return note;
}

async function crashLoader(): Promise<never> {
  await delay(300);
  throw new Error("crashLoader threw on purpose");
}

// Route objects live outside JSX - that's what makes this a "data router".
function createDemoRouter() {
  return createMemoryRouter([
    {
      path: "/",
      element: <DataLayout />,
      children: [
        {
          // Pathless route whose only job is to be an error boundary *inside*
          // the layout, so the nav stays visible when a child route fails.
          errorElement: <DemoError />,
          children: [
            { index: true, element: <DataHome /> },
            { path: "notes", loader: notesLoader, action: notesAction, element: <Notes /> },
            { path: "notes/:noteId", loader: noteLoader, element: <NoteDetails />, errorElement: <NoteError /> },
            {
              path: "reports",
              lazy: {
                loader: async () => (await import("./reportsLoader")).loader,
                Component: async () => (await import("./ReportsRoute")).default,
              },
            },
            { path: "crash", loader: crashLoader, element: <p>Never rendered.</p> },
          ],
        },
      ],
    },
  ]);
}

export default function DataRouterDemo() {
  // Lazy initial state (lesson 30): one router per mount, created once.
  const [router] = useState(createDemoRouter);
  return <RouterProvider router={router} />;
}

function DataLayout() {
  const navigation = useNavigation();
  const navClass = ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) =>
    isActive ? "active" : isPending ? "pending" : "";

  return (
    <>
      <AddressBar />
      <div className="router-demo">
        <nav className="router-demo-nav">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/notes" className={navClass}>Notes</NavLink>
          <NavLink to="/reports" className={navClass}>Reports (lazy)</NavLink>
          <NavLink to="/notes/99" className={navClass}>Missing note</NavLink>
          <NavLink to="/crash" className={navClass}>Crashing loader</NavLink>
          <span className="router-demo-auth">
            useNavigation().state = <strong>{navigation.state}</strong>
            {navigation.location ? ` → ${navigation.location.pathname}` : ""}
          </span>
        </nav>
        {/* The old page stays on screen, dimmed, while the next route's loader runs. */}
        <div className={navigation.state === "loading" ? "router-demo-page loading" : "router-demo-page"}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

function DataHome() {
  return (
    <>
      <h3>Home</h3>
      <p>
        Click Notes and watch the status in the top right: <code>loading</code> while its loader waits
        600ms, then <code>idle</code>. No useEffect, no useState for the data.
      </p>
    </>
  );
}

function Notes() {
  const { notes, loadedAt } = useLoaderData<typeof notesLoader>();
  const actionData = useActionData<typeof notesAction>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <>
      <h3>Notes</h3>
      <p className="demo-label">useLoaderData() - loader last ran at {loadedAt}</p>
      {/* key: a new note changes the count, which remounts the form and clears the input. */}
      <Form method="post" key={notes.length}>
        <input name="title" placeholder="New note title" aria-label="New note title" />{" "}
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Add note"}
        </button>
      </Form>
      {actionData?.error && <p className="router-demo-error">useActionData() → {actionData.error}</p>}
      <ul>
        {notes.map((note) => (
          <NoteRow key={note.id} note={note} />
        ))}
      </ul>
      <p>
        After every action the router re-runs the loader for you - watch the timestamp change. Try
        submitting an empty title too.
      </p>
    </>
  );
}

function NoteRow({ note }: { note: Note }) {
  // Each row gets its own fetcher: it calls the action without navigating, and
  // its state is tracked separately from the page's navigation.
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  return (
    <li style={{ opacity: busy ? 0.5 : 1 }}>
      <Link to={`/notes/${note.id}`}>{note.title}</Link>{" "}
      <fetcher.Form method="post" action="/notes" style={{ display: "inline" }}>
        <input type="hidden" name="intent" value="delete" />
        <input type="hidden" name="id" value={note.id} />
        <button type="submit" disabled={busy}>
          Delete
        </button>
      </fetcher.Form>{" "}
      <code>fetcher.state = {fetcher.state}</code>
    </li>
  );
}

function NoteDetails() {
  const note = useLoaderData<typeof noteLoader>();
  return (
    <>
      <h3>{note.title}</h3>
      <p>
        Loaded by <code>noteLoader</code> with <code>params.noteId = "{note.id}"</code>.
      </p>
      <Link to="/notes">← All notes</Link>
    </>
  );
}

function NoteError() {
  const error = useRouteError();
  return (
    <div className="router-demo-error">
      <h3>Note route's own errorElement</h3>
      {isRouteErrorResponse(error) ? (
        <p>
          {error.status} - {String(error.data)}
        </p>
      ) : (
        <p>{(error as Error).message}</p>
      )}
      <Link to="/notes">← All notes</Link>
    </div>
  );
}

function DemoError() {
  const error = useRouteError();
  return (
    <div className="router-demo-error">
      <h3>Shared errorElement</h3>
      <p>
        /crash has no errorElement of its own, so the error bubbled up to the nearest parent that has one.
      </p>
      <p>
        <code>useRouteError()</code> → {error instanceof Error ? error.message : String(error)}
      </p>
      <Link to="/">← Home</Link>
    </div>
  );
}
