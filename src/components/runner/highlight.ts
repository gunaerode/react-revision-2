// A tiny, dependency-free TSX highlighter. It's not a full parser - it only has
// to make examples easy to scan - so it colours comments, strings, keywords,
// JSX tags, numbers and hook/setter calls, and leaves everything else as-is.

const KEYWORDS =
  "import|from|export|default|function|return|const|let|var|if|else|for|of|in|while|do|new|typeof|instanceof|type|interface|async|await|true|false|null|undefined|switch|case|break|continue|try|catch|finally|throw|class|extends|as|this|void";

const TOKEN = new RegExp(
  [
    String.raw`(\/\/[^\n]*|\/\*[\s\S]*?\*\/)`, // 1 comment
    String.raw`("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\`(?:[^\`\\]|\\.)*\`)`, // 2 string
    String.raw`(<\/?[A-Za-z][\w.]*|\/?>)`, // 3 jsx tag
    String.raw`\b(${KEYWORDS})\b`, // 4 keyword
    String.raw`\b(\d+(?:\.\d+)?)\b`, // 5 number
    String.raw`\b(use[A-Z]\w*|set[A-Z]\w*|use)(?=\s*\()`, // 6 hook / setter call
    String.raw`\b([A-Z]\w*)\b`, // 7 Component / Type name
  ].join("|"),
  "g",
);

const CLASS = [
  "",
  "tok-comment",
  "tok-string",
  "tok-tag",
  "tok-keyword",
  "tok-number",
  "tok-hook",
  "tok-type",
];

function escape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlight(code: string): string {
  let html = "";
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    html += escape(code.slice(last, index));
    const group = match.findIndex((g, i) => i > 0 && g !== undefined);
    html += `<span class="${CLASS[group]}">${escape(match[0])}</span>`;
    last = index + match[0].length;
  }
  html += escape(code.slice(last));
  // A trailing newline in a <pre> collapses - add one so the overlay and the
  // textarea stay the same height when the code ends with an empty line.
  return html + "\n";
}
