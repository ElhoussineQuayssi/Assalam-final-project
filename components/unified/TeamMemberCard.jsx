// components/unified/TeamMemberCard.jsx
import Image from "next/image";

/**
 * Card component for team member profiles
 * @param {string} name - Team member name
 * @param {string} role - Team member role/title
 * @param {string} imageSrc - Image source path
 * @param {string} imageAlt - Image alt text
 * @param {string} className - Additional CSS classes
 */
export default function TeamMemberCard({
  name,
  role,
  imageSrc,
  imageAlt,
  className = ""
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden text-center hover-lift animate-fade-in ${className}`}>
      <div className="h-64 relative">
        <Image
          src={imageSrc || `/placeholder.svg?height=300&width=300`}
          alt={imageAlt || name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-blue-600 font-medium">
          {role}
        </p>
      </div>
    </div>
  );
}
