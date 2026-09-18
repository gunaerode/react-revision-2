interface LikeButtonProps {
  label: string;
  onLike: () => void;
}

// LikeButton has zero opinion about what "liking" means - it just calls whatever
// function its parent handed it through the onLike prop. The same component can
// power very different behavior depending on who renders it.
export default function LikeButton({ label, onLike }: LikeButtonProps) {
  return <button onClick={onLike}>{label}</button>;
}
