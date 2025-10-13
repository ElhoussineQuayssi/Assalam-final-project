// components/unified/ProjectGallery.jsx
import Image from "next/image";

/**
 * Project photo gallery component
 * @param {Array} images - Array of image source strings
 * @param {string} projectTitle - Project title for alt text
 * @param {string} className - Additional CSS classes
 */
export default function ProjectGallery({
  images = [],
  projectTitle,
  className = ""
}) {
  if (!images.length) return null;

  return (
    <div className={`animate-fade-in ${className}`}>
      <h3 className="text-2xl font-bold mb-6 text-green-700">
        Galerie Photos
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <Image
              src={image || `/placeholder.svg?height=300&width=300`}
              alt={`Image ${index + 1} du ${projectTitle}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
