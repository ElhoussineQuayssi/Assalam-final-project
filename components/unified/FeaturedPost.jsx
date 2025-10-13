// components/unified/FeaturedPost.jsx
import Image from "next/image";
import Link from "next/link";
import { Button } from ".";
/**
 * Featured blog post component for hero sections
 * @param {Object} post - Blog post object with title, excerpt, image, slug, category, date
 * @param {string} className - Additional CSS classes
 */
export default function FeaturedPost({ post, className = "" }) {
  if (!post) return null;

  return (
    <section className={`mb-16 ${className}`}>
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow-lg overflow-hidden hover-lift animate-fade-in">
        <div className="h-80 md:h-auto relative">
          <Image
            src={post.image || `/placeholder.svg?height=400&width=600`}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-8">
          <div className="mb-3">
            <span className="bg-brand-secondary text-brand-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm ml-3">
              {new Date(post.date || post.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-ui-text hover:text-brand-primary transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <Button
            href={`/blogs/${post.slug}`}
            variant="primary"
            className="hover-lift"
          >
            Lire l'article
          </Button>
        </div>
      </div>
    </section>
  );
}
