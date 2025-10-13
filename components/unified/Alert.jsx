// components/unified/Alert.jsx
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  className = "",
  dismissible = false,
}) {
  const alertConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-400",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-400",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-400",
    },
  };

  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg p-4 flex items-start
        animate-fade-in
        ${className}
      `}
    >
      <Icon className={`h-5 w-5 ${config.iconColor} mr-3 mt-0.5 flex-shrink-0`} />

      <div className="flex-1">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <p className="text-sm">{message}</p>
      </div>

      {dismissible && onClose && (
        <button
          onClick={onClose}
          className={`ml-3 ${config.textColor} hover:opacity-70 focus-ring`}
          aria-label="Fermer l'alerte"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
