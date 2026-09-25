import { useLoaderData } from "react-router";
import type { Report } from "./types";

// Vite puts this file in its own chunk because it's only reached through a
// dynamic import() in the route's lazy.Component - check the Network tab.
export default function ReportsRoute() {
  const reports = useLoaderData<Report[]>();
  return (
    <>
      <h3>Reports (lazy route)</h3>
      <p>This component and its loader were both fetched on demand the first time you opened /reports.</p>
      <ul>
        {reports.map((r) => (
          <li key={r.name}>
            {r.name}: {r.value}
          </li>
        ))}
      </ul>
    </>
  );
}
