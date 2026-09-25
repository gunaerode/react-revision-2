import type * as TS from "typescript";

// The playground compiles TSX in the browser with TypeScript's own transpiler.
// TypeScript is already a dependency of this project, so no new package is
// needed. It's a big module (~3 MB), so it is loaded lazily with a dynamic
// import - it only downloads the first time a playground is shown, and Vite
// puts it in its own chunk so the rest of the site stays fast.
let tsPromise: Promise<typeof TS> | null = null;

export function loadCompiler(): Promise<typeof TS> {
  if (!tsPromise) {
    tsPromise = import("typescript").then(
      (mod) => ((mod as unknown as { default?: typeof TS }).default ?? mod) as typeof TS,
    );
  }
  return tsPromise;
}

export interface CompileResult {
  js: string;
  error: string | null;
}

/**
 * TSX source -> CommonJS JavaScript. The automatic JSX runtime is used, so the
 * example code doesn't need `import React from "react"` in scope, exactly like
 * this project's own vite setup.
 */
export async function compile(source: string): Promise<CompileResult> {
  const ts = await loadCompiler();
  const out = ts.transpileModule(source, {
    fileName: "App.tsx",
    reportDiagnostics: true,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const syntaxErrors = (out.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (syntaxErrors.length > 0) {
    const d = syntaxErrors[0];
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n");
    if (d.file && d.start !== undefined) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
      return { js: "", error: `SyntaxError (line ${line + 1}:${character + 1}): ${message}` };
    }
    return { js: "", error: `SyntaxError: ${message}` };
  }
  return { js: out.outputText, error: null };
}
