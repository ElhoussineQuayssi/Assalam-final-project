// components/unified/Pagination.jsx
import Link from "next/link";

/**
 * Pagination component for navigating through pages
 * @param {number} currentPage - Current active page number
 * @param {number} totalPages - Total number of pages
 * @param {string} basePath - Base path for pagination links
 * @param {string} activeCategory - Optional category filter for links
 * @param {string} className - Additional CSS classes
 */
export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/blogs",
  activeCategory = null,
  className = ""
}) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className={`mt-12 flex justify-center ${className}`}>
      <nav className="inline-flex rounded-lg shadow-md overflow-hidden">
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNumber = idx + 1;
          const isActive = pageNumber === currentPage;

          return (
            <Link
              key={idx}
              href={getPageUrl(pageNumber)}
              className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white border-r border-gray-200 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
