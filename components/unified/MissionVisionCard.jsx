// components/unified/MissionVisionCard.jsx
/**
 * Card component for mission and vision sections
 * @param {string} type - "mission" or "vision"
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} className - Additional CSS classes
 */
export default function MissionVisionCard({
  type = "mission",
  title,
  description,
  className = ""
}) {
  const cardConfig = {
    mission: {
      icon: "M",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    vision: {
      icon: "V",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
  };

  const config = cardConfig[type];

  return (
    <div className={`bg-white p-8 rounded-lg shadow-md hover-lift animate-fade-in ${className}`}>
      <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
        <span className={`${config.textColor} text-2xl font-bold`}>
          {config.icon}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
