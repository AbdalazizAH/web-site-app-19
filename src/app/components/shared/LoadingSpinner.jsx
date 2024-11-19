export default function LoadingSpinner({ size = "medium", light = false }) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-2",
    large: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full animate-spin
        ${
          light
            ? "border-white border-t-transparent"
            : "border-blue-500 border-t-transparent"
        }`}
    />
  );
}
