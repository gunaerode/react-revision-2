import { useState } from "react";

const MOVIES = [
  { id: 1, title: "Baahubali", year: 2015, rating: 8.0, genre: "Action" },
  { id: 2, title: "Vikram", year: 2022, rating: 8.3, genre: "Action" },
  { id: 3, title: "Soorarai Pottru", year: 2020, rating: 8.6, genre: "Drama" },
  { id: 4, title: "3 Idiots", year: 2009, rating: 8.4, genre: "Comedy" },
  { id: 5, title: "Jai Bhim", year: 2021, rating: 8.7, genre: "Drama" },
];

export default function App() {
  const [genre, setGenre] = useState("All");
  const genres = ["All", ...new Set(MOVIES.map((m) => m.genre))];

  // Derive the list to show with plain array methods - no extra state needed.
  const visible = MOVIES
    .filter((m) => genre === "All" || m.genre === genre)
    .toSorted((a, b) => b.rating - a.rating);

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)} style={{ fontWeight: g === genre ? 700 : 400 }}>
            {g}
          </button>
        ))}
      </div>

      <ol style={{ paddingLeft: 20 }}>
        {visible.map((movie) => (
          <li key={movie.id} style={{ marginBottom: 6 }}>
            <strong>{movie.title}</strong> ({movie.year}) - ⭐ {movie.rating}
          </li>
        ))}
      </ol>
      <small>{visible.length} of {MOVIES.length} movies</small>
    </div>
  );
}
