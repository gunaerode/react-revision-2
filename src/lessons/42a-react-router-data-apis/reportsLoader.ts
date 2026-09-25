import type { Report } from "./types";
import { delay } from "./utils";

// Only downloaded the first time /reports is visited - the route's
// lazy.loader imports this file on demand.
export async function loader(): Promise<Report[]> {
  await delay(500);
  return [
    { name: "Notes created", value: 12 },
    { name: "Notes deleted", value: 3 },
  ];
}
