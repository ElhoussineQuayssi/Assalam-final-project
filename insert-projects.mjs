import fs from 'fs';
import getDb from './lib/db/index.js';

async function insertProjects() {
  const projectsData = JSON.parse(fs.readFileSync('parsed-projects.json', 'utf-8'));
  const db = await getDb();

  console.log(`Inserting ${projectsData.length} projects into database...`);

  for (const project of projectsData) {
    try {
      // Check if project with this slug already exists
      const existingProject = db.prepare("SELECT id FROM projects WHERE slug = ?").get(project.slug);
      if (existingProject) {
        console.log(`Project "${project.slug}" already exists. Updating...`);
        // Update existing project with new content
        db.prepare(`
          UPDATE projects SET
            title = ?,
            excerpt = ?,
            categories = ?,
            status = ?,
            content = ?,
            goals = ?,
            gallery = ?,
            createdAt = ?
          WHERE slug = ?
        `).run(
          project.title,
          project.excerpt,
          JSON.stringify(project.categories),
          project.status,
          JSON.stringify(project.content),
          JSON.stringify(project.goals || []),
          JSON.stringify(project.gallery || []),
          project.createdAt,
          project.slug
        );
        console.log(`✓ Updated project: "${project.title}"`);
        continue;
      }

      const newProject = {
        id: project.id,
        slug: project.slug,
        title: project.title,
        excerpt: project.excerpt,
        image: project.image || null,
        categories: JSON.stringify(project.categories),
        startDate: project.startDate || null,
        location: project.location || null,
        peopleHelped: project.peopleHelped || null,
        status: project.status,
        content: JSON.stringify(project.content),
        goals: JSON.stringify(project.goals || []),
        gallery: JSON.stringify(project.gallery || []),
        createdAt: project.createdAt,
      };

      db.prepare(`
        INSERT INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newProject.id,
        newProject.slug,
        newProject.title,
        newProject.excerpt,
        newProject.image,
        newProject.categories,
        newProject.startDate,
        newProject.location,
        newProject.peopleHelped,
        newProject.status,
        newProject.content,
        newProject.goals,
        newProject.gallery,
        newProject.createdAt
      );

      console.log(`✓ Inserted project: "${project.title}"`);
    } catch (error) {
      console.error(`✗ Error inserting project "${project.title}":`, error.message);
    }
  }

  console.log('Project insertion completed!');
}

insertProjects().catch(console.error);