// In a real project each section below would be its own file.
// The playground only has one file, so the "files" are marked with comments.

// ---- types/course.types.ts -------------------------------------------
interface Course {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

// ---- constants/courses.constants.ts ----------------------------------
const COURSES: Course[] = [
  { id: 1, title: "React Basics", level: "Beginner" },
  { id: 2, title: "Hooks in Depth", level: "Intermediate" },
  { id: 3, title: "Performance", level: "Advanced" },
];

// ---- utils/format.ts --------------------------------------------------
function levelColor(level: Course["level"]) {
  return { Beginner: "#1a8a4a", Intermediate: "#a86400", Advanced: "#c62f2f" }[level];
}

// ---- components/CourseCard.tsx ----------------------------------------
function CourseCard({ course }: { course: Course }) {
  return (
    <li style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8, marginBottom: 8 }}>
      <strong>{course.title}</strong>{" "}
      <span style={{ color: levelColor(course.level), fontSize: 13 }}>● {course.level}</span>
    </li>
  );
}

// ---- App.tsx ------------------------------------------------------------
export default function App() {
  return (
    <ul style={{ listStyle: "none", padding: 0, fontFamily: "system-ui" }}>
      {COURSES.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </ul>
  );
}
