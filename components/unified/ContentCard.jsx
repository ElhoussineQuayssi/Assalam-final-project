// components/unified/ContentCard.jsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export default function ContentCard({
  title,
  excerpt,
  image,
  link,
  category,
  date,
  className = "",
  variant = "default", // default, blog, project, featured
  priority = false,
}) {
  const cardStyles = {
    default:
      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift group cursor-pointer",
    featured:
      "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover-lift group cursor-pointer ring-1 ring-gray-100",
    blog: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift group cursor-pointer",
    project: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift group cursor-pointer",
  };

  const imageHeight = {
    default: "h-48",
    featured: "h-64",
    blog: "h-40",
    project: "h-52",
  };

  return (
    <div className={`${cardStyles[variant]} ${className}`}>
      <div className={`${imageHeight[variant]} relative overflow-hidden`}>
        <Image
          src={image || `/placeholder.svg?height=400&width=600`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {variant === "featured" && (
          <div className="absolute top-4 left-4">
            <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              À la une
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {category && (
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-brand-primary" />
            <span className="text-sm text-brand-primary font-medium">
              {category}
            </span>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-3 text-ui-text group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {variant === "blog" && date && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        )}

        {link && (
          <Link
            href={link}
            className="inline-flex items-center text-brand-primary hover:text-brand-primary-dark font-medium group/btn"
          >
            <span className="mr-2">
              {variant === "blog" ? "Lire l'article" : "En savoir plus"}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
