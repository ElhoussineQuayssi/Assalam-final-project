// components/unified/SectionHeader.jsx
export default function SectionHeader({
  title,
  subtitle,
  className = "",
  centered = true,
  size = "large",
}) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-3xl md:text-4xl",
  };

  const containerClasses = centered ? "text-center mb-12" : "mb-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <h2 className={`${sizeClasses[size]} font-bold mb-4`}>{title}</h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
