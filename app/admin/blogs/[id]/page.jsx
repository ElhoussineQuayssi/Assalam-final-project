import { getBlogById } from "lib/actions";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { AdminPageHeader, Button } from "components/unified";

export default async function BlogPost({ params }) {
  const { id } = await params; // Await params before destructuring
  const result = await getBlogById(id);

  if (!result.success) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">
          {result.message || "Article introuvable."}
        </p>
      </div>
    );
  }

  const blog = result.data;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with back button */}
      <div className="mb-8">
        <AdminPageHeader
          title="Détails de l'Article"
          subtitle="Visualisez et gérez cet article de blog"
        />
        <div className="mt-4">
          <Button href="/admin/blogs" variant="outlineLight" className="inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste des articles
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Article Header */}
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm">
                Publié le {new Date(blog.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            {blog.category && (
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                <span className="text-sm bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Article Image */}
        {blog.image && (
          <div className="relative h-96 w-full">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-brand-primary prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      {/* Excerpt if exists */}
      {blog.excerpt && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Résumé</h3>
          <p className="text-blue-800">{blog.excerpt}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={`/admin/blogs/${id}/edit`}>
          <Button variant="primary" className="inline-flex items-center">
            Modifier l'article
          </Button>
        </Link>
        <Button variant="danger" className="inline-flex items-center">
          Supprimer l'article
        </Button>
      </div>
    </div>
  );
}
