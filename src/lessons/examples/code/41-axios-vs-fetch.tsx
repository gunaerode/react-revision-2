import axios from "axios";
import { useState } from "react";

// A tiny user browser that loads from a real API with either fetch or axios.
// Try id 999 - fetch does NOT throw on a 404 unless you check res.ok yourself.

interface User { id: number; name: string; email: string; company?: { name: string } }

const API = "https://jsonplaceholder.typicode.com/users";

async function withFetch(id: number): Promise<User> {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error(`fetch: HTTP ${res.status}`); // remove this line and try id 999!
  return res.json();
}

async function withAxios(id: number): Promise<User> {
  const res = await axios.get<User>(`${API}/${id}`); // rejects on 4xx/5xx by itself
  return res.data;
}

export default function App() {
  const [id, setId] = useState(1);
  const [client, setClient] = useState<"fetch" | "axios">("fetch");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const data = await (client === "fetch" ? withFetch(id) : withAxios(id));
      setUser(data);
      console.log(`${client} ->`, data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 360 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <select value={client} onChange={(e) => setClient(e.target.value as "fetch" | "axios")}>
          <option value="fetch">fetch</option>
          <option value="axios">axios</option>
        </select>
        <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} style={{ width: 70 }} />
        <button onClick={load} disabled={loading}>{loading ? "Loading…" : "Load user"}</button>
      </div>
      {error && <p style={{ color: "crimson" }}>⚠️ {error}</p>}
      {user && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "#e6f4f9" }}>
          <strong>{user.name ?? "(no name - is this really a user?)"}</strong>
          <div>{user.email}</div>
          <small>{user.company?.name}</small>
        </div>
      )}
    </div>
  );
}
