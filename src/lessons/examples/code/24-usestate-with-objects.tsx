import { useState } from "react";

// State objects must be REPLACED, never mutated.
// Copy the old object with ...spread, then override what changed.
// Nested objects need their own spread too.

const initial = {
  name: "Meena",
  role: "Frontend Developer",
  address: { city: "Chennai", pin: "600001" },
};

export default function App() {
  const [profile, setProfile] = useState(initial);

  function updateField(field: "name" | "role", value: string) {
    setProfile({ ...profile, [field]: value });
  }

  function updateCity(city: string) {
    setProfile({ ...profile, address: { ...profile.address, city } });
  }

  function brokenMutation() {
    profile.name = "Mutated!"; // ❌ same object -> React sees no change, no re-render
    setProfile(profile);
    console.log("mutated, but the UI didn't update:", profile.name);
  }

  return (
    <div style={{ fontFamily: "system-ui", display: "grid", gap: 8, maxWidth: 320 }}>
      <input value={profile.name} onChange={(e) => updateField("name", e.target.value)} />
      <input value={profile.role} onChange={(e) => updateField("role", e.target.value)} />
      <input value={profile.address.city} onChange={(e) => updateCity(e.target.value)} />
      <button onClick={brokenMutation}>❌ Try mutating directly</button>

      <div style={{ padding: 14, borderRadius: 10, background: "#e6f4f9" }}>
        <strong>{profile.name}</strong>
        <div>{profile.role}</div>
        <small>📍 {profile.address.city} - {profile.address.pin}</small>
      </div>
    </div>
  );
}
