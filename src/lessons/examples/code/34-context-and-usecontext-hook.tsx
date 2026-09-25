import { createContext, useContext, useState } from "react";

// Context "teleports" a value to any component below a Provider,
// with no props in between. Here: the current language.

type Lang = "en" | "ta" | "hi";

const GREETINGS: Record<Lang, { hello: string; learn: string }> = {
  en: { hello: "Hello", learn: "Let's learn React" },
  ta: { hello: "வணக்கம்", learn: "ரியாக்ட் கற்போம்" },
  hi: { hello: "नमस्ते", learn: "चलो React सीखें" },
};

// 1. Create the context (with a default for components outside any Provider).
const LanguageContext = createContext<Lang>("en");

// 3. Any descendant reads it - no props needed.
function Greeting() {
  const lang = useContext(LanguageContext);
  return <h2 style={{ margin: "8px 0" }}>{GREETINGS[lang].hello} 👋</h2>;
}

function Tagline() {
  const lang = useContext(LanguageContext);
  return <p style={{ color: "#667" }}>{GREETINGS[lang].learn}</p>;
}

// This component knows nothing about language.
function Page() {
  return (
    <div style={{ padding: 16, borderRadius: 12, background: "#eef0ff" }}>
      <Greeting />
      <Tagline />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 360 }}>
      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
      </select>
      {/* 2. Provide a value to everything inside (React 19: <Context> is the provider). */}
      <LanguageContext value={lang}>
        <Page />
      </LanguageContext>
    </div>
  );
}
