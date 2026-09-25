export interface DemoUser {
  id: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}

export interface FeatureRow {
  feature: string;
  react: string;
  router: string;
}

export interface ApiRow {
  group: string;
  name: string;
  purpose: string;
}

/** What DemoLayout hands to every child route through <Outlet context>. */
export interface DemoContext {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  currentUser: DemoUser;
}
