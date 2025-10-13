// components/unified/ImageTextSection.jsx
import Image from "next/image";

/**
 * Reusable section with alternating image-text layout
 * @param {string} title - Section title
 * @param {string} content - Section content (can be string or JSX)
 * @param {string} imageSrc - Image source path
 * @param {string} imageAlt - Image alt text
 * @param {string} layout - Layout direction: "image-left", "image-right"
 * @param {string} titleColor - Title color variant: "blue", "green"
 * @param {string} className - Additional CSS classes
 */
export default function ImageTextSection({
  title,
  content,
  imageSrc,
  imageAlt,
  layout = "image-left",
  titleColor = "blue",
  className = "",
}) {
  const titleColors = {
    blue: "text-blue-700",
    green: "text-green-700",
  };

  const isImageLeft = layout === "image-left";

  return (
    <section className={`grid md:grid-cols-2 gap-12 items-center ${className}`}>
      {isImageLeft && (
        <div className="relative h-80 animate-fade-in">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="animate-fade-in" style={{ animationDelay: isImageLeft ? "0.2s" : "0" }}>
        <h2 className={`text-3xl font-bold mb-4 ${titleColors[titleColor]}`}>
          {title}
        </h2>
        <div className="text-gray-700">
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      </div>

      {!isImageLeft && (
        <div className="relative h-80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </section>
  );
}
