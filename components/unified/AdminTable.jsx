// components/unified/AdminTable.jsx
/**
 * Admin table component for displaying data in tabular format
 * @param {Array} columns - Array of column definitions {key, label, className}
 * @param {Array} data - Array of data objects to display
 * @param {Function} renderActions - Function to render action buttons for each row
 * @param {boolean} loading - Loading state
 * @param {string} className - Additional CSS classes
 */
import LoadingSpinner from "./LoadingSpinner";

export default function AdminTable({
  columns = [],
  data = [],
  renderActions,
  loading = false,
  className = ""
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <LoadingSpinner size="large" className="mx-auto" />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-x-auto animate-fade-in ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={`px-6 py-3 text-left text-sm font-semibold text-gray-900 ${column.className || ""}`}
              >
                {column.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="px-6 py-8 text-center text-gray-500"
              >
                Aucun élément trouvé
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                {columns.map((column) => (
                  <td key={column.key || `${index}-${column.key}`} className="px-6 py-4 text-sm text-gray-900">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-6 py-4 text-right space-x-3">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
