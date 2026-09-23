import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import { fetchTodoWithAxios, fetchTodoWithFetch, MISSING_ID, VALID_ID } from "./utils";

const meta = metaFor("40a-axios-vs-fetch");

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
        "fetch()'s promise only rejects on a network failure (offline, DNS, CORS) - a 404 or 500 response is still a completed fetch as far as the Promise is concerned. Click the first button: it hits a real, nonexistent todo on JSONPlaceholder and 'succeeds' with the 404 page's own JSON body, because nothing ever checked response.ok.",
        "The second button hits the same missing id but checks response.ok first, matching what fetchTodoWithFetch in utils.ts does when its checkStatus argument is true - that manual check is the only thing standing between 'silently wrong data' and a proper error.",
        "axios.get() inspects the HTTP status itself: anything outside 2xx rejects the promise automatically, so the third button lands in the catch block with no manual check at all - and axios also parses JSON for you (res.data is already an object; fetch needs an explicit await res.json()).",
      ]}
      docsNote="Same tradeoff react.dev's data fetching guidance points at: fetch needs no dependency but more manual error handling; axios is a dependency that handles more of it for you."
    >
      <div className="side-by-side">
        <button onClick={tryFetchNaive}>fetch (no .ok check) - the bug</button>
        <button onClick={tryFetchCorrect}>fetch (with .ok check) - correct</button>
        <button onClick={tryAxiosMissing}>axios.get (missing id, auto-throws)</button>
        <button onClick={tryAxiosValid}>axios.get (valid id)</button>
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
