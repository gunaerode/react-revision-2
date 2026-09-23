import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { fetchTodoWithAxios, fetchTodoWithFetch, MISSING_ID, VALID_ID } from "./utils";

const meta = metaFor("41-axios-vs-fetch");

const FETCH_NAIVE_SNIPPET = `const res = await fetch(url);
const data = await res.json();
// no res.ok check - a 404's body becomes "data"`;

const FETCH_CORRECT_SNIPPET = `const res = await fetch(url);
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
const data = await res.json();`;

const AXIOS_SNIPPET = `const { data } = await axios.get(url);
// non-2xx rejects the promise automatically`;

export default function AxiosVsFetch() {
  const [log, setLog] = useState<string[]>([]);

  function append(message: string) {
    setLog((prev) => [message, ...prev].slice(0, 8));
  }

  async function tryFetchNaive() {
    try {
      const body = await fetchTodoWithFetch(MISSING_ID, false);
      append(`fetch, no .ok check -> "succeeded" with ${body} - that's the 404 page's body, not a real todo!`);
    } catch (e) {
      append(`fetch, no .ok check -> threw: ${(e as Error).message}`);
    }
  }

  async function tryFetchCorrect() {
    try {
      const body = await fetchTodoWithFetch(MISSING_ID, true);
      append(`fetch, with .ok check -> ${body}`);
    } catch (e) {
      append(`fetch, with .ok check -> correctly threw: ${(e as Error).message}`);
    }
  }

  async function tryAxiosMissing() {
    try {
      const body = await fetchTodoWithAxios(MISSING_ID);
      append(`axios -> ${body}`);
    } catch (e) {
      append(`axios -> automatically threw: ${(e as Error).message}`);
    }
  }

  async function tryAxiosValid() {
    try {
      const body = await fetchTodoWithAxios(VALID_ID);
      append(`axios, valid id -> ${body}`);
    } catch (e) {
      append(`axios -> threw: ${(e as Error).message}`);
    }
  }

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "fetch()'s promise only rejects on a network failure (offline, DNS, CORS) - a 404 or 500 response is still a completed fetch as far as the Promise is concerned. Run the first card: it hits a real, nonexistent todo on JSONPlaceholder and 'succeeds' with the 404 page's own JSON body, because nothing ever checked response.ok.",
        "The second card hits the same missing id but checks response.ok first, matching fetchTodoWithFetch in utils.ts when its checkStatus argument is true - that one manual check is the only thing standing between 'silently wrong data' and a proper error.",
        "axios.get() inspects the HTTP status itself: anything outside 2xx rejects the promise automatically, so the third card lands in the catch block with no manual check at all - and axios also parses JSON for you (res.data is already an object; fetch needs an explicit await res.json()).",
      ]}
      docsNote="Same tradeoff react.dev's data fetching guidance points at: fetch needs no dependency but more manual error handling; axios is a dependency that handles more of it for you."
    >
      <div className="side-by-side">
        <div className="card">
          <p className="demo-label">fetch - no .ok check (the bug)</p>
          <pre className="code-snippet">
            <code>{FETCH_NAIVE_SNIPPET}</code>
          </pre>
          <button onClick={tryFetchNaive}>Run</button>
        </div>
        <div className="card">
          <p className="demo-label">fetch - with .ok check (correct)</p>
          <pre className="code-snippet">
            <code>{FETCH_CORRECT_SNIPPET}</code>
          </pre>
          <button onClick={tryFetchCorrect}>Run</button>
        </div>
        <div className="card">
          <p className="demo-label">axios.get (auto-throws on error)</p>
          <pre className="code-snippet">
            <code>{AXIOS_SNIPPET}</code>
          </pre>
          <div className="side-by-side">
            <button onClick={tryAxiosMissing}>Run (missing id)</button>
            <button onClick={tryAxiosValid}>Run (valid id)</button>
          </div>
        </div>
      </div>
      <p>log (newest first), from real requests to jsonplaceholder.typicode.com:</p>
      <ul>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </LessonLayout>
  );
}
