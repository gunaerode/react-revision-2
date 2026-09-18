import { sections } from "../../lessons/registry";

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <nav className="sidebar">
      <p className="sidebar-title">React 19 Tutorial</p>
      {sections.map((section) => (
        <div key={section.name} className="sidebar-section">
          <p className="sidebar-section-title">{section.name}</p>
          <ul>
            {section.lessons.map((lesson) => (
              <li key={lesson.id}>
                <button
                  className={lesson.id === activeId ? "sidebar-link active" : "sidebar-link"}
                  onClick={() => onSelect(lesson.id)}
                >
                  {lesson.number}. {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
