// components/unified/AdminActionButtons.jsx
import Link from "next/link";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";

/**
 * Admin action buttons component for table rows
 * @param {Object} item - Data item for the row
 * @param {Array} actions - Array of action definitions
 * @param {string} className - Additional CSS classes
 */
export default function AdminActionButtons({
  item,
  actions = [],
  className = ""
}) {
  const defaultActions = [
    {
      key: "view",
      icon: Eye,
      href: (item) => `/admin/blogs/${item.id}`,
      className: "text-gray-600 hover:text-gray-900",
      title: "Voir"
    },
    {
      key: "edit",
      icon: Edit,
      href: (item) => `/admin/blogs/${item.id}/edit`,
      className: "text-blue-600 hover:text-blue-900",
      title: "Modifier"
    },
    {
      key: "delete",
      icon: Trash2,
      onClick: (item) => console.log("Delete", item.id),
      className: "text-red-600 hover:text-red-900",
      title: "Supprimer"
    },
  ];

  const actionsToRender = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={`flex items-center justify-end space-x-3 ${className}`}>
      {actionsToRender.map((action) => {
        const Icon = action.icon;

        if (action.href) {
          return (
            <Link
              key={action.key}
              href={typeof action.href === "function" ? action.href(item) : action.href}
              className={`${action.className} transition-colors duration-200`}
              title={action.title}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        }

        if (action.onClick) {
          return (
            <button
              key={action.key}
              onClick={() => action.onClick(item)}
              className={`${action.className} transition-colors duration-200`}
              title={action.title}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}
