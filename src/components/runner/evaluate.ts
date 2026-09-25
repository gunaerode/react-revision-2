import type { ComponentType } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as JsxRuntime from "react/jsx-runtime";
import * as ReactRouter from "react-router";
import * as Immer from "immer";
import * as UseImmer from "use-immer";
import axios from "axios";

// Packages an example may `import` from. Anything else throws a friendly error.
// Every entry is marked __esModule so TypeScript's CommonJS interop treats named
// and default imports exactly like the real ES modules do.
function esm(namespace: object, defaultExport?: unknown) {
  return { ...namespace, default: defaultExport ?? namespace, __esModule: true };
}

const MODULES: Record<string, unknown> = {
  react: esm(React, React),
  "react/jsx-runtime": JsxRuntime,
  "react-dom": esm(ReactDOM, ReactDOM),
  "react-router": esm(ReactRouter),
  immer: esm(Immer, Immer.produce),
  "use-immer": esm(UseImmer),
  axios: esm({ axios }, axios),
};

export const AVAILABLE_IMPORTS = Object.keys(MODULES).filter((m) => m !== "react/jsx-runtime");

export type LogLevel = "log" | "info" | "warn" | "error";

export interface LogEntry {
  id: number;
  level: LogLevel;
  text: string;
}

function format(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === "function") return `ƒ ${value.name || "anonymous"}()`;
  try {
    return JSON.stringify(value, null, 1)?.replace(/\n\s*/g, " ") ?? String(value);
  } catch {
    return String(value);
  }
}

/** A console that forwards to the real one AND to the playground's log panel. */
export function createConsole(onLog: (level: LogLevel, text: string) => void) {
  const make =
    (level: LogLevel) =>
    (...args: unknown[]) => {
      onLog(level, args.map(format).join(" "));
      console[level](...args);
    };
  return { ...console, log: make("log"), info: make("info"), warn: make("warn"), error: make("error") };
}

/**
 * Runs compiled CommonJS code and returns the component to render: the default
 * export, or else a component named `App`.
 */
export function evaluate(js: string, sandboxConsole: ReturnType<typeof createConsole>): ComponentType {
  const module = { exports: {} as Record<string, unknown> };
  function require(name: string) {
    if (name in MODULES) return MODULES[name];
    throw new Error(`Cannot import "${name}" in the playground. Available: ${AVAILABLE_IMPORTS.join(", ")}.`);
  }
  // new Function keeps the example out of this module's scope; it only sees what
  // is passed in explicitly.
  const run = new Function("require", "module", "exports", "console", js);
  run(require, module, module.exports, sandboxConsole);

  const Component = (module.exports.default ?? module.exports.App) as ComponentType | undefined;
  if (typeof Component !== "function" && typeof Component !== "object") {
    throw new Error("Nothing to render - add `export default function App() { ... }`.");
  }
  return Component as ComponentType;
}
