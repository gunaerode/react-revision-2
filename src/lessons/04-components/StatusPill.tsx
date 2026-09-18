import type { StatusPillProps } from "./types";

const TONE_COLOR: Record<StatusPillProps["tone"], string> = {
  ok: "seagreen",
  warn: "goldenrod",
  down: "crimson",
};

// A component is just a function: it takes props in, returns JSX out. Nothing more
// is required to make something reusable - no class, no registration, no config.
export default function StatusPill({ label, tone }: StatusPillProps) {
  return (
    <span
      style={{
        color: "white",
        background: TONE_COLOR[tone],
        borderRadius: 999,
        padding: "2px 10px",
        fontSize: 13,
        marginRight: 8,
      }}
    >
      {label}
    </span>
  );
}
