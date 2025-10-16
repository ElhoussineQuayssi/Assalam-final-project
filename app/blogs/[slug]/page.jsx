import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Preservation of the original data fetching functions
import { getBlogBySlug, getBlogs, incrementBlogViews } from "lib/actions";
import { formatDate } from "lib/utils";
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
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import SectionWithBackground from "@/components/SectionWithBackground/SectionWithBackground";
import ContentCard from "@/components/ContentCard/ContentCard";
import ShareButton from "@/components/ShareButton/ShareButton";

// --- Design System Configuration (Minimalist Light Blue) ---
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White

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
    .filter((b) => b.category === blog.category && b.slug !== slug)
    .slice(0, 2);

  return (
    <main style={{ backgroundColor: BACKGROUND }}>
      <Container className="py-16">
        <article>
          {/* Hero Section - Uses PRIMARY_LIGHT background */}
          <SectionWithBackground
            variant="blue"
            className="text-center mb-12 max-w-4xl mx-auto rounded-xl shadow-lg"
          >
            <div className="mb-6">
              <Button href="/blogs" variant="outline" className="mb-4">
                Retour à l'Espace Récits et Actualités {/* Enhanced Content */}
              </Button>
            </div>
            {/* Category Link - Refactored to use inline styles */}
            <div className="mb-6">
              <Link
                href={`/blogs?category=${blog.category}`}
                className="text-sm font-medium px-3 py-1 rounded-full transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `${PRIMARY_LIGHT}B3`,
                  color: DARK_TEXT,
                  border: `1px solid ${ACCENT}80`,
                }}
              >
                {blog.category}
              </Link>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: ACCENT }}
            >
              {blog.title}
            </h1>
            <p className="text-xl mb-8" style={{ color: `${DARK_TEXT}D9` }}>
              {blog.excerpt}
            </p>

            <div
              className="flex flex-wrap justify-center gap-6 text-sm"
              style={{ color: `${DARK_TEXT}B3` }}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" style={{ color: ACCENT }} />
                <span>Publié le {formatDate(blog.createdAt)}</span>{" "}
                {/* Enhanced Content */}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" style={{ color: ACCENT }} />
                <span>Temps de lecture : {blog.readTime || 5} min</span>{" "}
                {/* Enhanced Content */}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" style={{ color: ACCENT }} />
                <span>Par {blog.author?.name || "l'Équipe Assalam"}</span>{" "}
                {/* Enhanced Content */}
              </div>
            </div>
          </SectionWithBackground>

          {/* Featured Image */}
          <div className="h-96 relative rounded-xl overflow-hidden mb-12 shadow-2xl">
            <Image
              src={blog.image || `/placeholder.svg?height=800&width=1200`}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-4 gap-12">
            {/* Left Sidebar - Share & Categories */}
            <div className="hidden md:block">
              <div className="sticky top-12 space-y-8">
                <div>
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={{ color: ACCENT }}
                  >
                    Partager ce Récit de Solidarité
                  </h4>{" "}
                  {/* Enhanced Content */}
                  <div className="flex flex-col gap-3">
                    <ShareButton
                      platform="facebook"
                      slug={slug}
                      title={blog.title}
                    />
                    <ShareButton
                      platform="twitter"
                      slug={slug}
                      title={blog.title}
                      excerpt={blog.excerpt}
                    />
                    <ShareButton platform="linkedin" slug={slug} />
                    <ShareButton platform="instagram" slug={slug} />
                  </div>
                </div>

                <div>
                  <h4
                    className="text-lg font-semibold mb-4"
                    style={{ color: ACCENT }}
                  >
                    Domaines d'Action
                  </h4>{" "}
                  {/* Enhanced Content */}
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
                        className="hover:underline transition-colors"
                        style={{ color: DARK_TEXT }}
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
              <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden card-lift">
                <div className="relative z-10">
                  {/* Prose replacement to ensure color hierarchy */}
                  <div className="break-words">
                    <style jsx global>{`
                      .blog-content h1,
                      .blog-content h2,
                      .blog-content h3,
                      .blog-content h4 {
                        color: ${ACCENT} !important;
                      }
                      .blog-content p,
                      .blog-content li,
                      .blog-content blockquote {
                        color: ${DARK_TEXT} !important;
                        line-height: 1.75;
                      }
                      .blog-content a {
                        color: ${ACCENT} !important;
                        text-decoration: underline;
                      }
                    `}</style>
                    <div
                      className="blog-content mb-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </div>

                  {/* Tags */}
                  {blog.tags && (
                    <div className="mt-12 flex flex-wrap gap-2">
                      {blog.tags.split(",").map((tag, idx) => (
                        <Link
                          key={idx}
                          href={`/blogs?tag=${tag.trim()}`}
                          className="hover:opacity-80 transition-colors px-3 py-1 rounded-md text-sm"
                          style={{
                            backgroundColor: PRIMARY_LIGHT,
                            color: DARK_TEXT,
                          }}
                        >
                          <Tag
                            className="inline w-3 h-3 mr-1"
                            style={{ color: ACCENT }}
                          />
                          {tag.trim()}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Author Info - Refactored for inline colors */}
                  {blog.author && (
                    <div
                      className="mt-12 p-6 rounded-xl shadow-md"
                      style={{
                        backgroundColor: PRIMARY_LIGHT,
                        borderLeft: `4px solid ${ACCENT}`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
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
                          <h3
                            className="font-bold text-lg"
                            style={{ color: DARK_TEXT }}
                          >
                            {blog.author.name}
                          </h3>
                          <p className="text-sm" style={{ color: ACCENT }}>
                            {blog.author.role}
                          </p>
                        </div>
                      </div>
                      <p
                        className="mt-4 text-sm"
                        style={{ color: `${DARK_TEXT}D9` }}
                      >
                        {blog.author.bio}
                      </p>
                    </div>
                  )}

                  {/* Mobile Share - Refactored for inline colors */}
                  <div className="mt-12 md:hidden">
                    <h4
                      className="text-lg font-semibold mb-4"
                      style={{ color: DARK_TEXT }}
                    >
                      Partager cet article
                    </h4>
                    <div className="flex gap-4">
                      {["facebook", "twitter", "linkedin", "instagram"].map(
                        (platform) => {
                          const Icon =
                            platform === "facebook"
                              ? Facebook
                              : platform === "twitter"
                                ? Twitter
                                : platform === "linkedin"
                                  ? Linkedin
                                  : Instagram;
                          const color =
                            platform === "facebook"
                              ? "#1877F2"
                              : platform === "twitter"
                                ? "#1DA1F2"
                                : platform === "linkedin"
                                  ? "#0A66C2"
                                  : "#E4405F";
                          return (
                            <a
                              key={platform}
                              href={
                                new ShareButton({
                                  platform,
                                  slug,
                                  title: blog.title,
                                }).props.href
                              } // Accessing URL from a temporary instance
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-full text-white shadow-md hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: color }}
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Related Articles */}
            <div>
              <div className="sticky top-12">
                <h4
                  className="text-lg font-semibold mb-6"
                  style={{ color: ACCENT }}
                >
                  Plus de Récits d'Espoir et d'Impact
                </h4>{" "}
                {/* Enhanced Content */}
                <div className="space-y-6">
                  {relatedBlogs.map((post, idx) => (
                    <Link
                      href={`/blogs/${post.slug}`}
                      key={idx}
                      className="block"
                    >
                      <ContentCard
                        title={post.title}
                        excerpt={post.excerpt}
                        image={post.image}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
