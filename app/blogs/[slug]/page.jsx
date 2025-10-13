import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getBlogs, incrementBlogViews } from "lib/actions";
import { formatDate } from "lib/utils";
import {
  Container,
  SectionWithBackground,
  ContentCard,
  Button,
} from "components/unified";
import {
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Tag,
} from "lucide-react";

function ShareButton({ platform, slug, title, excerpt }) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${baseUrl}/blogs/${slug}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title || "")}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent((title || "") + " - " + (excerpt || ""))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    instagram: "https://www.instagram.com/"
  };

  const platformIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram
  };

  const platformLabels = {
    facebook: "Facebook",
    twitter: "X",
    linkedin: "LinkedIn",
    instagram: "Instagram"
  };

  const platformColors = {
    facebook: "text-blue-600 hover:text-blue-800",
    twitter: "text-sky-600 hover:text-sky-800",
    linkedin: "text-blue-600 hover:text-blue-800",
    instagram: "text-pink-600 hover:text-pink-800"
  };

  const Icon = platformIcons[platform];

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center ${platformColors[platform]} transition-colors`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {platformLabels[platform]}
    </a>
  );
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  const blog = result.data;

  if (!blog) {
    notFound();
  }

  // Increment view count (only on server side)
  if (typeof window === "undefined") {
    await incrementBlogViews(slug);
  }

  // Get related blogs (same category, excluding current blog)
  const allBlogsResult = await getBlogs();
  const allBlogs = allBlogsResult.data || [];
  const relatedBlogs = allBlogs
    .filter(b => b.category === blog.category && b.slug !== slug)
    .slice(0, 2);

  return (
    <Container className="py-16">
      <article>
        {/* Hero Section */}
        <SectionWithBackground variant="blue" className="text-center mb-12 max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" className="mb-4">
              <Link href="/blogs">Retour à la liste des blogs</Link>
            </Button>
          </div>
          <div className="mb-6">
            <Link
              href={`/blogs?category=${blog.category}`}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              {blog.category}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{blog.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{blog.excerpt}</p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{blog.readTime || 5} min de lecture</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{blog.author?.name || "Équipe Assalam"}</span>
            </div>
          </div>
        </SectionWithBackground>

        {/* Featured Image */}
        <div className="h-96 relative rounded-xl overflow-hidden mb-12 shadow-lg">
          <Image
            src={blog.image || `/placeholder.svg?height=800&width=1200`}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-6 space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Partager</h4>
                <div className="flex flex-col gap-3">
                  <ShareButton platform="facebook" slug={slug} title={blog.title} />
                  <ShareButton platform="twitter" slug={slug} title={blog.title} excerpt={blog.excerpt} />
                  <ShareButton platform="linkedin" slug={slug} />
                  <ShareButton platform="instagram" slug={slug} />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Catégories</h4>
                <div className="flex flex-col gap-2">
                  {[
                    "Éducation",
                    "Santé",
                    "Environnement",
                    "Culture",
                    "Solidarité",
                  ].map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/blogs?category=${cat}`}
                      className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 relative overflow-hidden">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-50 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-a:text-blue-600 prose-p:text-gray-800 break-words">
                  <div
                    className="mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* Tags */}
                {blog.tags && (
                  <div className="mt-12 flex flex-wrap gap-2">
                    {blog.tags.split(',').map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/blogs?tag=${tag.trim()}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        <Tag className="inline w-3 h-3 mr-1" />
                        {tag.trim()}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Author Info */}
                {blog.author && (
                  <SectionWithBackground variant="blue" className="mt-12 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden relative">
                        <Image
                          src={
                            blog.author.avatar ||
                            `/placeholder.svg?height=100&width=100`
                          }
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{blog.author.name}</h3>
                        <p className="text-blue-100">{blog.author.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-blue-100">{blog.author.bio}</p>
                  </SectionWithBackground>
                )}

                {/* Mobile Share */}
                <div className="mt-12 md:hidden">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Partager cet article</h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-sky-600 text-white p-3 rounded-full hover:bg-sky-700 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Related Articles */}
          <div>
            <div className="sticky top-6">
              <h4 className="text-lg font-semibold mb-6 text-gray-900">Articles Similaires</h4>
              <div className="space-y-6">
                {relatedBlogs.map((post, idx) => (
                  <Link href={`/blogs/${post.slug}`} key={idx}>
                    <ContentCard
                      title={post.title}
                      excerpt={post.excerpt}
                      image={post.image}
                      link={`/blogs/${post.slug}`}
                      variant="blog"
                      className="hover:shadow-lg transition-shadow duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
