// components/unified/ValueCard.jsx
/**
 * Card component for values section
 * @param {string} title - Value title
 * @param {string} description - Value description
 * @param {string} borderColor - Border color: "green", "blue", "red", "purple"
 * @param {string} className - Additional CSS classes
 */
export default function ValueCard({
  title,
  description,
  borderColor = "green",
  className = ""
}) {
  const borderColors = {
    green: "border-green-500",
    blue: "border-blue-500",
    red: "border-red-500",
    purple: "border-purple-500",
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-t-4 hover-lift animate-fade-in ${borderColors[borderColor]} ${className}`}>
      <h3 className="text-xl font-bold mb-3 text-blue-700">
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
