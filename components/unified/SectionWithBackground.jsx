// components/unified/SectionWithBackground.jsx
/**
 * Reusable section component with colored background and consistent styling
 * @param {string} variant - Background color variant: "blue", "green", "gray", "white"
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 */
export default function SectionWithBackground({
  variant = "blue",
  className = "",
  children
}) {
  const variants = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    gray: "bg-gray-50",
    white: "bg-white",
  };

  return (
    <section className={`${variants[variant]} p-8 rounded-lg shadow-sm ${className}`}>
      {children}
    </section>
  );
}
