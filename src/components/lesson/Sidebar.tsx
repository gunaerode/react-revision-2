import { useEffect, useRef, useState } from "react";
import { lessons, sections } from "../../lessons/registry";
import { lessonLabel } from "../../lessons/navigation";
import type { Lesson } from "../../types/lesson.types";

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  /** Only affects narrow viewports - the sidebar is always visible above the mobile breakpoint. */
  open: boolean;
  onClose: () => void;
  completed: string[];
}

function matches(lesson: Lesson, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${lessonLabel(lesson)} ${lesson.title} ${lesson.section} ${lesson.summary}`
    .toLowerCase()
    .includes(q);
}

export function ReactLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23 23 20.46" aria-hidden="true" className="react-logo">
      <circle r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export default function Sidebar({ activeId, onSelect, open, onClose, completed }: SidebarProps) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const activeLinkRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searching = query.trim().length > 0;
  const total = lessons.length;
  const doneCount = lessons.filter((l) => completed.includes(l.id)).length;
  const percent = Math.round((doneCount / total) * 100);

  // "/" focuses the search box from anywhere on the page (like GitHub / MDN).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.closest("input, textarea, select, [contenteditable='true']");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the active lesson visible in the (long) sidebar list. Scroll only the
  // list itself - scrollIntoView() would also scroll the page.
  useEffect(() => {
    const link = activeLinkRef.current;
    const list = scrollRef.current;
    if (!link || !list) return;
    const top = link.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top > list.scrollTop + list.clientHeight - 40) {
      list.scrollTop = top - list.clientHeight / 3;
    }
  }, [activeId]);

  function selectAndClose(id: string) {
    onSelect(id);
    onClose();
  }

  function renderLink(lesson: Lesson, sub = false) {
    const isActive = lesson.id === activeId;
    const isDone = completed.includes(lesson.id);
    return (
      <button
        ref={isActive ? activeLinkRef : undefined}
        className={`sidebar-link${sub ? " sidebar-sublink" : ""}${isActive ? " active" : ""}`}
        onClick={() => selectAndClose(lesson.id)}
        aria-current={isActive ? "page" : undefined}
        title={lesson.summary}
      >
        <span
          className={`lesson-badge${isDone ? " done" : ""}`}
          aria-label={isDone ? "completed" : undefined}
        >
          {isDone ? "✓" : lessonLabel(lesson)}
        </span>
        <span className="sidebar-link-text">{lesson.title}</span>
      </button>
    );
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <nav className={open ? "sidebar open" : "sidebar"} aria-label="Lessons">
        <div className="sidebar-top">
          <a
            className="brand"
            href={`#/${lessons[0].id}`}
            onClick={(e) => {
              e.preventDefault();
              selectAndClose(lessons[0].id);
            }}
          >
            <ReactLogo />
            <span>
              <strong>React 19</strong>
              <small>Learn by doing</small>
            </span>
          </a>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="progress-card">
          <div className="progress-row">
            <span>Your progress</span>
            <strong>
              {doneCount}/{total}
            </strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="sidebar-search">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="m20 20-4.2-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            className="search-input"
            placeholder="Search lessons"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
              if (e.key === "Enter") {
                const first = lessons.find((l) => matches(l, query));
                if (first) selectAndClose(first.id);
              }
            }}
            aria-label="Search lessons"
          />
          {!searching && <kbd>/</kbd>}
        </div>

        <div className="sidebar-scroll" ref={scrollRef}>
          {sections.map((section) => {
            const visible = section.lessons.filter(
              (l) => matches(l, query) || lessons.some((c) => c.parentId === l.id && matches(c, query)),
            );
            if (visible.length === 0) return null;
            const sectionIds = lessons.filter((l) => l.section === section.name).map((l) => l.id);
            const sectionDone = sectionIds.filter((id) => completed.includes(id)).length;
            const containsActive = sectionIds.includes(activeId);
            const isCollapsed = !searching && !containsActive && collapsed[section.name];

            return (
              <div key={section.name} className="sidebar-section">
                <button
                  className="sidebar-section-title"
                  onClick={() => setCollapsed((c) => ({ ...c, [section.name]: !isCollapsed }))}
                  aria-expanded={!isCollapsed}
                >
                  <span className={`caret${isCollapsed ? "" : " open"}`} aria-hidden="true">
                    ▸
                  </span>
                  <span className="sidebar-section-name">{section.name}</span>
                  <span className="sidebar-section-count">
                    {sectionDone}/{sectionIds.length}
                  </span>
                </button>
                {!isCollapsed && (
                  <ul>
                    {visible.map((lesson) => {
                      const children = lessons.filter(
                        (l) => l.parentId === lesson.id && (matches(l, query) || matches(lesson, query)),
                      );
                      return (
                        <li key={lesson.id}>
                          {renderLink(lesson)}
                          {children.length > 0 && (
                            <ul className="sidebar-sublist">
                              {children.map((child) => (
                                <li key={child.id}>{renderLink(child, true)}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
          {sections.every((s) => !s.lessons.some((l) => matches(l, query))) &&
            !lessons.some((l) => matches(l, query)) && (
              <p className="sidebar-empty">No lessons match “{query}”.</p>
            )}
        </div>
      </nav>
    </>
  );
}
