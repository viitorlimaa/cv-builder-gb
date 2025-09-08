export default function Skeleton({
  width = "100%",
  height = "1rem",
  className = "",
}) {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}
