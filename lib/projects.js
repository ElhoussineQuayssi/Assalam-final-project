import getDb from "./db";

/**
 * Read projects from database
 * @returns {Project[]} Array of projects
 */
export async function getProjects() {
  try {
    const db = await getDb();
    const projects = db
      .prepare(`
        SELECT id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt, updatedAt
        FROM projects
        ORDER BY createdAt DESC
      `)
      .all();

    // Parse JSON fields for each project
    return projects.map(project => ({
      ...project,
      categories: JSON.parse(project.categories || '[]'),
      content: JSON.parse(project.content || '[]'),
      goals: project.goals ? JSON.parse(project.goals) : [],
      gallery: project.gallery ? JSON.parse(project.gallery) : []
    }));
  } catch (error) {
    console.error('Error loading projects:', error);
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
    const db = await getDb();
    const project = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug);

    if (!project) return null;

    return {
      ...project,
      categories: JSON.parse(project.categories || '[]'),
      content: JSON.parse(project.content || '[]'),
      goals: project.goals ? JSON.parse(project.goals) : [],
      gallery: project.gallery ? JSON.parse(project.gallery) : []
    };
  } catch (error) {
    console.error('Error loading project:', error);
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
    const db = await getDb();
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

    if (!project) return null;

    return {
      ...project,
      categories: JSON.parse(project.categories || '[]'),
      content: JSON.parse(project.content || '[]'),
      goals: project.goals ? JSON.parse(project.goals) : [],
      gallery: project.gallery ? JSON.parse(project.gallery) : []
    };
  } catch (error) {
    console.error('Error loading project by ID:', error);
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
    db.prepare(`
      INSERT INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
      project.createdAt
    );
  } catch (error) {
    console.error('Error adding project:', error);
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
    db.prepare(`
      UPDATE projects
      SET slug = ?, title = ?, excerpt = ?, image = ?, categories = ?, startDate = ?, location = ?, peopleHelped = ?, status = ?, content = ?, goals = ?, gallery = ?, updatedAt = ?
      WHERE id = ?
    `).run(
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
      id
    );
  } catch (error) {
    console.error('Error updating project:', error);
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
    console.error('Error deleting project:', error);
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
