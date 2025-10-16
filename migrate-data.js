#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
import { config } from "dotenv";
config({ path: ".env.local" });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing Supabase environment variables. Please set in .env.local:",
  );
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateData() {
  console.log("Starting data migration from SQLite to Supabase...");

  try {
    // Check if SQLite database exists
    const sqlitePath = path.join(__dirname, "data.sqlite");
    if (!fs.existsSync(sqlitePath)) {
      console.error("SQLite database not found at:", sqlitePath);
      console.log("Please ensure data.sqlite exists in the project root.");
      return;
    }

    // Check if environment variables are set
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables.");
      console.error(
        "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
      );
      return;
    }

    // Migrate admins - using a simple JSON-based approach since better-sqlite3 is removed
    console.log("Migrating admins...");
    // For now, we'll skip SQLite migration since better-sqlite3 is removed
    // You can manually export your data or restore better-sqlite3 temporarily
    console.log(
      "Note: SQLite migration skipped. You can manually migrate your data.",
    );
    console.log(
      "Example: Export your SQLite data to JSON first, then import to Supabase.",
    );

    // Migrate projects from JSON file instead
    console.log("Migrating projects from JSON file...");
    const projectsJsonPath = path.join(__dirname, "data", "projects.json");
    if (fs.existsSync(projectsJsonPath)) {
      const projectsData = JSON.parse(
        fs.readFileSync(projectsJsonPath, "utf8"),
      );
      for (const project of projectsData) {
        const { error } = await supabase.from("projects").insert({
          id: project.id,
          slug: project.slug,
          title: project.title,
          excerpt: project.excerpt,
          image: project.image,
          categories: project.categories,
          start_date: project.startDate,
          location: project.location,
          people_helped: project.peopleHelped,
          status: project.status,
          content: project.content,
          goals: project.goals,
          gallery: project.gallery,
          created_at: project.createdAt || new Date().toISOString(),
          updated_at: project.updatedAt || new Date().toISOString(),
        });

        if (error) {
          console.error("Error migrating project:", project.title, error);
        } else {
          console.log("Migrated project:", project.title);
        }
      }
    } else {
      console.log("No projects.json file found, skipping project migration");
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run migration
migrateData().catch(console.error);
