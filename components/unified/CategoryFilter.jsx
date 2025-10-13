// components/unified/CategoryFilter.jsx
import Link from "next/link";

/**
 * Category filter component for blogs with active state styling
 * @param {Array} categories - Array of category strings
 * @param {string} activeCategory - Currently selected category
 * @param {string} basePath - Base path for links (default: "/blogs")
 * @param {string} className - Additional CSS classes
 */
export default function CategoryFilter({
  categories = [],
  activeCategory = null,
  basePath = "/blogs",
  className = ""
}) {
  return (
    <section className={`mb-12 ${className}`}>
      <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
        <Link
          href={basePath}
          className={`${
            !activeCategory
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover-lift"
          } px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-medium`}
        >
          Tous
        </Link>
        {categories.map((category, idx) => (
          <Link
            key={idx}
            href={`${basePath}?category=${encodeURIComponent(category)}`}
            className={`${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover-lift"
            } px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 font-medium`}
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
