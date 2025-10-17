import React from "react";
import Link from "next/link";
import Image from "next/image";
// Preservation of the original data fetching functions
import { getBlogs } from "@/lib/actions";
import Container from "@/components/Container/Container";
import Button from "@/components/Button/Button";
import UnifiedHero from "@/components/UnifiedHero";
import FeaturedPost from "@/components/FeaturedPost/FeaturedPost";
import ContentCard from "@/components/ContentCard/ContentCard";
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import ContentGrid from "@/components/ContentGrid/ContentGrid";
import ShareButton from "@/components/ShareButton/ShareButton";
import Pagination from "@/components/Pagination/Pagination";

// --- Design System Configuration (Minimalist Light Blue) ---
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White

// --- Original Page Logic ---

export default async function Blogs({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || null;
  const page = parseInt(params?.page || "1", 10);
  const blogsPerPage = 6;

  const result = await getBlogs();
  const allBlogs = result.data || [];

  // Filter blogs by category if a category is selected
  const filteredBlogs = category
    ? allBlogs.filter((blog) => blog.category === category)
    : allBlogs;

  // Paginate blogs
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage,
  );

  const categories = [...new Set(allBlogs.map((blog) => blog.category))];

  return (
    <main style={{ backgroundColor: BACKGROUND }}>
      <Container className="py-16">
        {/* Header Section */}
        <UnifiedHero
          title="Récits d'Impact et Actualités"
          subtitle="Explorez les histoires d'espoir, les actualités et les avancées de la Fondation Assalam à travers le Maroc."
          images={[
            "/projects/centre-himaya.jpg",
            "/projects/programme-rayhana.jpg",
            "/projects/programme-kafala.jpg"
          ]}
        />

        {/* Featured Post */}
        {paginatedBlogs[0] && <FeaturedPost post={paginatedBlogs[0]} />}

        {/* Categories */}
        <CategoryFilter
          categories={categories}
          activeCategory={category}
          basePath="/blogs"
        />

        {/* All Posts */}
        <section>
          {paginatedBlogs.length > 1 && ( // Only show sub-grid if there are more than 1 post (to avoid featuring the same one twice)
            <ContentGrid
              // Use slice(1) to skip the featured post if it was the first one on the page
              items={paginatedBlogs.slice(1)}
              columns={{ default: 1, md: 2, lg: 3 }}
              renderItem={(blog) => (
                <ContentCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                  link={`/blogs/${blog.slug}`}
                  category={blog.category}
                  date={blog.createdAt}
                  className="h-full"
                />
              )}
            />
          )}

          {paginatedBlogs.length === 0 && (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg mx-auto max-w-xl">
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: ACCENT }}
              >
                Oups, rien ici.
              </h3>
              <p>
                Aucun récit ne correspond à cette catégorie pour le moment.
                Revenez bientôt !
              </p>{" "}
              {/* Enhanced Content */}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/blogs"
            activeCategory={category}
          />
        </section>
      </Container>
    </main>
  );
}
