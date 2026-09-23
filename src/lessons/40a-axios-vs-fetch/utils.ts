import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// JSONPlaceholder returns HTTP 404 for an id outside its dataset - real behavior
// from a real API, not a simulated error, which is exactly what makes the fetch
// vs axios difference below worth seeing instead of just reading about.
export const MISSING_ID = 999999;
export const VALID_ID = 1;

export async function fetchTodoWithFetch(id: number, checkStatus: boolean): Promise<string> {
  const res = await fetch(`${BASE_URL}/${id}`);
  // fetch's promise only rejects on a network failure - a 404 or 500 response
  // still resolves successfully. Skipping this check is the bug the first
  // button demonstrates: an error page's body gets treated as real data.
  if (checkStatus && !res.ok) {
    throw new Error(`fetch got HTTP ${res.status} (fetch does not throw for this on its own)`);
  }
  const data = await res.json();
  return JSON.stringify(data);
}

export async function fetchTodoWithAxios(id: number): Promise<string> {
  // axios inspects the response status itself: anything outside the 2xx range
  // rejects the promise automatically, so a missing resource lands straight in
  // a catch block with no extra check needed.
  const res = await axios.get(`${BASE_URL}/${id}`);
  return JSON.stringify(res.data);
}
