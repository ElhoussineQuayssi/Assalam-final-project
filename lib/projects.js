import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Read projects from database
 * @returns {Project[]} Array of projects
 */
export async function getProjects() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from("projects")
      .select(
        "id, slug, title, excerpt, image, categories, start_date, location, people_helped, status, content, goals, created_at, updated_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    // Supabase already parses JSON fields, no need for manual JSON.parse
    return projects;
  } catch (error) {
    console.error("Unexpected error loading projects:", error);
    return [];
  }
}

/**
 * Get a single project by slug
 * @param {string} slug
 * @returns {Project|null}
 */
export async function getProject(slug) {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error('Invalid slug parameter:', { slug, type: typeof slug, isEmpty: slug === '' });
      return null;
    }

    console.log('Fetching project with slug:', slug);

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase error fetching project by slug:', {
        slug,
        error: error.message || error,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return null;
    }

    if (!project) {
      console.log('No project found with slug:', slug);
      return null;
    }

    console.log('Successfully fetched project:', { id: project.id, title: project.title, slug: project.slug });
    return project;
  } catch (error) {
    console.error('Unexpected error in getProject:', {
      slug,
      error: error.message,
      stack: error.stack
    });
    return null;
  }
}

/**
 * Get a single project by ID
 * @param {string} id
 * @returns {Project|null}
 */
export async function getProjectById(id) {
  try {
    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !project) {
      console.error("Error fetching project by ID:", error);
      return null;
    }

    // Supabase already parses JSON fields, no need for manual JSON.parse
    return project;
  } catch (error) {
    console.error("Unexpected error loading project by ID:", error);
    return null;
  }
}

/**
 * Add a new project to database
 * @param {Project} project
 */
export async function addProject(project) {
  try {
    const db = await getDb();
    db.prepare(
      `
      INSERT INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      project.id,
      project.slug,
      project.title,
      project.excerpt,
      project.image,
      JSON.stringify(project.categories || []),
      project.startDate,
      project.location,
      project.peopleHelped,
      project.status,
      JSON.stringify(project.content || []),
      JSON.stringify(project.goals || []),
      JSON.stringify(project.gallery || []),
      project.createdAt,
    );
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

/**
 * Update an existing project in database
 * @param {string} id
 * @param {Project} updatedProject
 */
export async function updateProject(id, updatedProject) {
  try {
    const db = await getDb();
    db.prepare(
      `
      UPDATE projects
      SET slug = ?, title = ?, excerpt = ?, image = ?, categories = ?, startDate = ?, location = ?, peopleHelped = ?, status = ?, content = ?, goals = ?, gallery = ?, updatedAt = ?
      WHERE id = ?
    `,
    ).run(
      updatedProject.slug,
      updatedProject.title,
      updatedProject.excerpt,
      updatedProject.image,
      JSON.stringify(updatedProject.categories || []),
      updatedProject.startDate,
      updatedProject.location,
      updatedProject.peopleHelped,
      updatedProject.status,
      JSON.stringify(updatedProject.content || []),
      JSON.stringify(updatedProject.goals || []),
      JSON.stringify(updatedProject.gallery || []),
      updatedProject.updatedAt,
      id,
    );
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

/**
 * Delete a project by ID
 * @param {string} id
 */
export async function deleteProject(id) {
  try {
    const db = await getDb();
    db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

/**
 * Generate a unique ID for a project
 * @returns {string}
 */
export function generateProjectId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

/**
 * Generate a slug from title
 * @param {string} title
 * @returns {string}
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .trim();
}
