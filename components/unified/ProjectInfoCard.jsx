// components/unified/ProjectInfoCard.jsx
import { CalendarDays, MapPin, Users, Clock } from "lucide-react";

/**
 * Project information card component for displaying project metadata
 * @param {string} type - Type of info: "date", "location", "people", "status"
 * @param {string} label - Display label
 * @param {string} value - Display value
 * @param {string} className - Additional CSS classes
 */
export default function ProjectInfoCard({
  type = "date",
  label,
  value,
  className = ""
}) {
  const cardConfig = {
    date: {
      icon: CalendarDays,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    location: {
      icon: MapPin,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    people: {
      icon: Users,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    status: {
      icon: Clock,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  };

  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} p-4 rounded-lg flex items-center hover-lift animate-fade-in ${className}`}>
      <Icon className={`h-10 w-10 ${config.iconColor} mr-4 flex-shrink-0`} />
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
