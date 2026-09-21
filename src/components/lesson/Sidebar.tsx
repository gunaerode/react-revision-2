import { lessons, sections } from "../../lessons/registry";

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  /** Only affects narrow viewports - the sidebar is always visible above the mobile breakpoint. */
  open: boolean;
  onClose: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Sidebar({
  activeId,
  onSelect,
  open,
  onClose,
  theme,
  onToggleTheme,
}: SidebarProps) {
  function selectAndClose(id: string) {
    onSelect(id);
    onClose();
  }

  return (
    <>
      {/* Tapping the dimmed backdrop closes the sidebar, same as the ✕ button. */}
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <nav className={open ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <p className="sidebar-title">React 19 Tutorial</p>
          <div className="sidebar-top-buttons">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
              ✕
            </button>
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.name} className="sidebar-section">
            <p className="sidebar-section-title">{section.name}</p>
            <ul>
              {section.lessons.map((lesson) => {
                const children = lessons.filter((l) => l.parentId === lesson.id);
                return (
                  <li key={lesson.id}>
                    <button
                      className={lesson.id === activeId ? "sidebar-link active" : "sidebar-link"}
                      onClick={() => selectAndClose(lesson.id)}
                    >
                      {lesson.number}. {lesson.title}
                    </button>
                    {children.length > 0 && (
                      <ul className="sidebar-sublist">
                        {children.map((child) => (
                          <li key={child.id}>
                            <button
                              className={
                                child.id === activeId
                                  ? "sidebar-link sidebar-sublink active"
                                  : "sidebar-link sidebar-sublink"
                              }
                              onClick={() => selectAndClose(child.id)}
                            >
                              {child.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
