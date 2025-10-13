// components/unified/AboutHeader.jsx
/**
 * Header component for about pages with consistent styling
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle/description
 * @param {string} size - Header size: "small", "medium", "large"
 * @param {boolean} centered - Whether to center the content
 * @param {string} className - Additional CSS classes
 */
export default function AboutHeader({
  title,
  subtitle,
  size = "medium",
  centered = true,
  className = "",
}) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-4xl",
  };

  const containerClasses = centered
    ? "text-center"
    : "text-left";

  return (
    <div className={`${containerClasses} mb-16 ${className}`}>
      <h1 className={`${sizeClasses[size]} font-bold mb-4 text-blue-700`}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
