// components/unified/StatsCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({
  title,
  value,
  change,
  changeText,
  icon: Icon,
  color = "blue",
  className = "",
}) {
  const colorClasses = {
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
    purple: "bg-purple-500 text-white",
    yellow: "bg-yellow-500 text-white",
    orange: "bg-orange-500 text-white",
    slate: "bg-slate-500 text-white",
  };

  const iconBgClasses = {
    blue: "bg-blue-700",
    green: "bg-green-700",
    red: "bg-red-700",
    purple: "bg-purple-700",
    yellow: "bg-yellow-700",
    orange: "bg-orange-700",
    slate: "bg-slate-700",
  };

  const isPositive = change >= 0;

  return (
    <div className={`rounded-lg shadow-md p-6 hover-lift transition-all duration-300 h-32 flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-black/90 font-medium">{title}</p>
          <h3 className="text-4xl font-bold mt-2 text-black/90">{value}</h3>
        </div>
        <div className={`${iconBgClasses[color]} p-3 rounded-lg`}>
          {Icon && <Icon className="h-6 w-6 text-white" />}
        </div>
      </div>

      {change !== undefined && changeText && (
        <div className="flex items-center mt-4">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-white/90 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-white/90 mr-1" />
          )}
          <span className={`text-sm font-medium text-white/90`}>
            {Math.abs(change)}%
          </span>
          <span className="text-white/80 text-sm ml-2">
            {changeText}
          </span>
        </div>
      )}
    </div>
  );
}
