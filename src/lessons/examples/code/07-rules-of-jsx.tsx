// The rules of JSX, all in one form:
// 1. Return ONE root element (a <>fragment</> counts).
// 2. Close every tag: <input />, <br />, <img />.
// 3. camelCase attributes: className, htmlFor, onClick, tabIndex.
// 4. style takes an object, with camelCase CSS properties.

export default function App() {
  return (
    <>
      <h3 style={{ fontFamily: "system-ui", marginTop: 0 }}>Create account</h3>
      <form
        className="signup"
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "grid", gap: 8, maxWidth: 280, fontFamily: "system-ui" }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="you@example.com" />

        <label htmlFor="plan">Plan</label>
        <select id="plan" defaultValue="free">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>

        <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input type="checkbox" defaultChecked /> Send me tips
        </label>
        <br />
        <button type="submit" tabIndex={0} style={{ backgroundColor: "#087ea4", color: "white" }}>
          Sign up
        </button>
      </form>
    </>
  );
}
