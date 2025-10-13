// components/unified/AdminStatsCard.jsx
import { Inbox, Mail, CheckCircle, Users, FileText } from "lucide-react";

/**
 * Admin statistics card component for dashboard metrics
 * @param {string} title - Card title
 * @param {number} value - Numeric value to display
 * @param {string} type - Type of stat: "total", "unread", "read", "users", "blogs"
 * @param {string} className - Additional CSS classes
 */
export default function AdminStatsCard({
  title,
  value,
  type = "total",
  className = ""
}) {
  const cardConfig = {
    total: {
      icon: Inbox,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    unread: {
      icon: Mail,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    read: {
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    users: {
      icon: Users,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    blogs: {
      icon: FileText,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  };

  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover-lift animate-fade-in ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${config.bgColor} p-2 rounded-lg`}>
          <Icon className={`${config.iconColor} h-5 w-5`} />
        </div>
      </div>
    </div>
  );
}
