import { Link, MemoryRouter, NavLink, Outlet, Route, Routes, useNavigate, useParams } from "react-router";

// A mini blog with nested routes. MemoryRouter keeps the URL in memory,
// so it works inside this playground (a real app would use BrowserRouter).

const POSTS = [
  { slug: "hooks", title: "Understanding Hooks", body: "Hooks let components remember things." },
  { slug: "router", title: "Routing 101", body: "Routes map URLs to components." },
  { slug: "context", title: "Context in 5 minutes", body: "Context avoids prop drilling." },
];

function Layout() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 700 : 400,
    marginRight: 12,
    color: isActive ? "#087ea4" : "inherit",
  });
  return (
    <div>
      <nav style={{ paddingBottom: 8, borderBottom: "1px solid #ddd" }}>
        <NavLink to="/" end style={linkStyle}>Home</NavLink>
        <NavLink to="/posts" style={linkStyle}>Posts</NavLink>
      </nav>
      <div style={{ paddingTop: 10 }}>
        <Outlet /> {/* the matched child route renders here */}
      </div>
    </div>
  );
}

function Home() {
  return <p>🏠 Welcome! Open the posts.</p>;
}

function Posts() {
  return (
    <ul>
      {POSTS.map((p) => (
        <li key={p.slug}><Link to={`/posts/${p.slug}`}>{p.title}</Link></li>
      ))}
    </ul>
  );
}

function Post() {
  const { slug } = useParams(); // from the :slug segment
  const navigate = useNavigate();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <p>Post not found.</p>;
  return (
    <article>
      <h3 style={{ margin: 0 }}>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => navigate(-1)}>← Back</button>
    </article>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:slug" element={<Post />} />
            <Route path="*" element={<p>404 😕</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </div>
  );
}
