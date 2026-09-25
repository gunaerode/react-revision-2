import type { ReactNode } from "react";

// `user` is needed only by <UserMenu>, deep down the tree.
// But every component in between has to accept it and pass it on.
// The dashed boxes are the components that are just "carrying" the prop.

interface User { name: string; avatar: string; }

function Box({ label, carrier, children }: { label: string; carrier?: boolean; children?: ReactNode }) {
  return (
    <div style={{
      border: carrier ? "2px dashed #c62f2f" : "2px solid #1a8a4a",
      borderRadius: 10, padding: "8px 12px", margin: "8px 0",
    }}>
      <small style={{ color: carrier ? "#c62f2f" : "#1a8a4a" }}>
        {label} {carrier ? "- only passes user down 😩" : ""}
      </small>
      {children}
    </div>
  );
}

function UserMenu({ user }: { user: User }) {
  return (
    <Box label="<UserMenu> - actually uses it ✅">
      <div style={{ fontSize: 18 }}>{user.avatar} Hi, {user.name}</div>
    </Box>
  );
}

function Navbar({ user }: { user: User }) {
  return <Box label="<Navbar user>" carrier><UserMenu user={user} /></Box>;
}

function Header({ user }: { user: User }) {
  return <Box label="<Header user>" carrier><Navbar user={user} /></Box>;
}

function Layout({ user }: { user: User }) {
  return <Box label="<Layout user>" carrier><Header user={user} /></Box>;
}

export default function App() {
  const user = { name: "Guna", avatar: "🧑‍💻" };
  return (
    <div style={{ fontFamily: "system-ui" }}>
      <Box label="<App> - owns user"><Layout user={user} /></Box>
    </div>
  );
}
