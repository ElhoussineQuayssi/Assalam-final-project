#!/usr/bin/env node

/**
 * Migration script to move projects from JSON file to database
 * Run this script once to migrate existing projects data
 */

import fs from "fs";
import path from "path";
import getDb from "./lib/db/index.js";

const PROJECTS_FILE = path.join(process.cwd(), "data", "projects.json");

async function migrateProjects() {
  try {
    console.log("🚀 Starting project migration...");

    // Check if projects file exists
    if (!fs.existsSync(PROJECTS_FILE)) {
      console.log("❌ No projects.json file found. Nothing to migrate.");
      return;
    }

    // Read projects from JSON file
    const projectsData = fs.readFileSync(PROJECTS_FILE, "utf8");
    const projects = JSON.parse(projectsData);

    if (projects.length === 0) {
      console.log("✅ No projects found in JSON file. Migration complete.");
      return;
    }

    console.log(`📋 Found ${projects.length} projects to migrate`);

    // Get database connection
    const db = await getDb();

    // Check if projects table exists
    const tableExists = db.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='projects'
    `).get();

    if (!tableExists) {
      console.error("❌ Projects table does not exist. Please run the application first to initialize the database.");
      return;
    }

    let migrated = 0;
    let skipped = 0;

    for (const project of projects) {
      try {
        // Check if project already exists in database
        const existing = db.prepare("SELECT id FROM projects WHERE id = ?").get(project.id);

        if (existing) {
          console.log(`⏭️  Skipping project "${project.title}" (ID: ${project.id}) - already exists`);
          skipped++;
          continue;
        }

        // Insert project into database
        db.prepare(`
          INSERT INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          project.id,
          project.slug,
          project.title,
          project.excerpt,
          project.image || null,
          JSON.stringify(project.categories || []),
          project.startDate || null,
          project.location || null,
          project.peopleHelped || null,
          project.status || 'Actif',
          JSON.stringify(project.content || []),
          JSON.stringify(project.goals || []),
          JSON.stringify(project.gallery || []),
          project.createdAt || new Date().toISOString(),
          project.updatedAt || new Date().toISOString()
        );

        console.log(`✅ Migrated project "${project.title}" (ID: ${project.id})`);
        migrated++;
      } catch (error) {
        console.error(`❌ Failed to migrate project "${project.title}":`, error.message);
      }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`   ✅ Migrated: ${migrated} projects`);
    console.log(`   ⏭️  Skipped: ${skipped} projects (already exist)`);
    console.log(`   📊 Total: ${projects.length} projects processed`);

    // Optionally backup the original file
    const backupFile = PROJECTS_FILE + '.backup.' + Date.now() + '.json';
    fs.copyFileSync(PROJECTS_FILE, backupFile);
    console.log(`💾 Original projects.json backed up to: ${backupFile}`);

  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProjects()
    .then(() => {
      console.log("👋 Migration script finished");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Migration script crashed:", error);
      process.exit(1);
    });
}

export default migrateProjects;
