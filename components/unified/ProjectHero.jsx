// components/unified/ProjectHero.jsx
import Image from "next/image";

/**
 * Hero section component for project detail pages
 * @param {string} title - Project title
 * @param {string} excerpt - Project description
 * @param {string} image - Background image source
 * @param {Array} categories - Array of category strings
 * @param {string} className - Additional CSS classes
 */
export default function ProjectHero({
  title,
  excerpt,
  image,
  categories = [],
  className = ""
}) {
  return (
    <section className={`relative h-96 rounded-xl overflow-hidden mb-12 ${className}`}>
      <Image
        src={image || `/placeholder.svg?height=400&width=800`}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-white/90 text-xl max-w-3xl leading-relaxed">
          {excerpt}
        </p>
      </div>
    </section>
  );
}
