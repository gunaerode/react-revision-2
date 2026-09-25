import { useState } from "react";

// A reusable StarRating doesn't know what a rating MEANS.
// It just calls the onRate function its parent passed in.

interface StarRatingProps {
  value: number;
  onRate: (stars: number) => void;
}

function StarRating({ value, onRate }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  return (
    <div onMouseLeave={() => setHover(0)} style={{ fontSize: 28, cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onMouseEnter={() => setHover(star)} onClick={() => onRate(star)}>
          {star <= (hover || value) ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [food, setFood] = useState(0);
  const [service, setService] = useState(0);

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <p>Food</p>
      <StarRating value={food} onRate={setFood} />
      <p>Service</p>
      <StarRating
        value={service}
        onRate={(stars) => {
          setService(stars);
          console.log(`Service rated ${stars}/5`);
        }}
      />
      <h3>Average: {((food + service) / 2).toFixed(1)} / 5</h3>
    </div>
  );
}
