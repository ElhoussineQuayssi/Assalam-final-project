// components/unified/TestimonialCard.jsx
import Image from "next/image";

export default function TestimonialCard({
  name,
  role,
  image,
  quote,
  className = "",
}) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden relative">
          <Image
            src={image || `/placeholder.svg?height=100&width=100`}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
