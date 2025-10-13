// components/unified/LoadingSpinner.jsx
export default function LoadingSpinner({
  size = "medium",
  color = "blue",
  className = "",
}) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    gray: "text-gray-600",
    white: "text-white",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          animate-spin rounded-full border-2 border-gray-300 border-t-transparent
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
    </div>
  );
}

// Skeleton loading component for content placeholders
export function LoadingSkeleton({
  lines = 3,
  height = "h-4",
  className = "",
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${height} bg-gray-200 rounded animate-pulse ${
            index === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

// Full page loading component
export function PageLoading({
  message = "Chargement...",
  className = "",
}) {
  return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${className}`}>
      <LoadingSpinner size="large" color="blue" />
      <p className="mt-4 text-gray-600 text-lg">{message}</p>
    </div>
  );
}
