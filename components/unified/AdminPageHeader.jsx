// components/unified/AdminPageHeader.jsx
import Link from "next/link";

/**
 * Admin page header component with title and action buttons
 * @param {string} title - Page title
 * @param {string} subtitle - Optional subtitle
 * @param {React.ReactNode} actionButton - Action button (usually create button)
 * @param {string} className - Additional CSS classes
 */
export default function AdminPageHeader({
  title,
  subtitle,
  actionButton,
  className = ""
}) {
  return (
    <div className={`flex flex-col md:flex-row justify-between items-center mb-6 ${className}`}>
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {actionButton && (
        <div className="animate-fade-in">
          {actionButton}
        </div>
      )}
    </div>
  );
}
