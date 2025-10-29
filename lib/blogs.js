import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Read blogs from database
 * @returns {Blog[]} Array of blogs
 */
export async function getBlogs() {
  try {
    const { data: blogs, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }

    return blogs;
  } catch (error) {
    console.error("Unexpected error loading blogs:", error);
    return [];
  }
}


/**
 * Get a single blog by slug
 * @param {string} slug
 * @returns {Blog|null}
 */
export async function getBlog(slug) {
  try {
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error('Invalid slug parameter:', { slug, type: typeof slug, isEmpty: slug === '' });
      return null;
    }

    const { data: blog, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }

    if (!blog) {
      console.log('No blog found with slug:', slug);
      return null;
    }

    return blog;
  } catch (error) {
    console.error('Unexpected error in getBlog:', error);
    return null;
  }
}
