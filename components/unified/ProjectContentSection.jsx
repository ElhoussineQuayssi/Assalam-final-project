// components/unified/ProjectContentSection.jsx
/**
 * Project content section component for objectives, activities, and team sections
 * @param {string} title - Section title
 * @param {string} titleColor - Title color: "blue", "green", "red", "purple"
 * @param {React.ReactNode} children - Section content
 * @param {string} className - Additional CSS classes
 */
export default function ProjectContentSection({
  title,
  titleColor = "green",
  children,
  className = ""
}) {
  const titleColors = {
    blue: "text-blue-700",
    green: "text-green-700",
    red: "text-red-700",
    purple: "text-purple-700",
  };

  return (
    <div className={`animate-fade-in ${className}`}>
      <h2 className={`text-2xl font-bold mb-6 ${titleColors[titleColor]}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}
