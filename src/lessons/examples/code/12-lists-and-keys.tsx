import { useState } from "react";

// Each row keeps its own "note" state. The key tells React which row is which,
// so when the list is shuffled each note stays attached to the right person.

interface Contact { id: string; name: string; }

function ContactRow({ contact }: { contact: Contact }) {
  const [note, setNote] = useState("");
  return (
    <li style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
      <span style={{ width: 70 }}>{contact.name}</span>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="note…" />
    </li>
  );
}

const START: Contact[] = [
  { id: "a1", name: "Asha" },
  { id: "b2", name: "Bala" },
  { id: "c3", name: "Chitra" },
];

export default function App() {
  const [contacts, setContacts] = useState(START);

  function shuffle() {
    setContacts((list) => list.toSorted(() => Math.random() - 0.5));
  }

  function addContact() {
    const name = ["Dev", "Esha", "Farhan", "Gita"][contacts.length % 4];
    // crypto.randomUUID() gives a stable, unique id - perfect for a key.
    setContacts((list) => [...list, { id: crypto.randomUUID(), name }]);
  }

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <p>Type a note next to each name, then shuffle.</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {contacts.map((c) => (
          <ContactRow key={c.id} contact={c} />
        ))}
      </ul>
      <button onClick={shuffle}>🔀 Shuffle</button>{" "}
      <button onClick={addContact}>➕ Add contact</button>
    </div>
  );
}
