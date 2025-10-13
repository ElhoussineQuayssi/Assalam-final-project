import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "lib/actions";
import {
  Container,
  ContentCard,
  ContentGrid,
  Button,
  FeaturedPost,
  CategoryFilter,
  Pagination,
  BlogHeader} from "components/unified";


export default async function Blogs({ searchParams }) {
  const category = searchParams?.category || null;
  const page = parseInt(searchParams?.page || "1", 10);
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
    <Container className="py-16">
      {/* Header Section */}
      <BlogHeader
        title="Blog & Actualités"
        subtitle="Découvrez les dernières actualités et articles de la Fondation Assalam"
      />

      {/* Featured Post */}
      {paginatedBlogs[0] && (
        <FeaturedPost post={paginatedBlogs[0]} />
      )}

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        activeCategory={category}
        basePath="/blogs"
      />

      {/* All Posts */}
      <section>
        <ContentGrid
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
              variant="blog"
              className="h-full"
            />
          )}
        />

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/blogs"
          activeCategory={category}
        />
      </section>
    </Container>
  );
}
