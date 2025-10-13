import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Schema definitions
const schema = `
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    failedAttempts INTEGER DEFAULT 0,
    lockedUntil DATETIME,
    lastLogin DATETIME,
    lastPasswordChange DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL,
    shareOnSocial BOOLEAN DEFAULT 0,
    views INTEGER DEFAULT 0,
    image TEXT, -- New column to store the image path
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'contact',
    status TEXT DEFAULT 'unread',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image TEXT,
    categories TEXT NOT NULL, -- JSON array stored as string
    startDate TEXT,
    location TEXT,
    peopleHelped TEXT,
    status TEXT DEFAULT 'Actif',
    content TEXT NOT NULL, -- JSON array stored as string
    goals TEXT, -- JSON array stored as string
    gallery TEXT, -- JSON array stored as string
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// Migration function
function migrate(db) {
  // Check if the 'image' column exists
  const columns = db.prepare("PRAGMA table_info(blog_posts)").all();
  const hasImageColumn = columns.some((col) => col.name === "image");

  if (!hasImageColumn) {
    db.prepare("ALTER TABLE blog_posts ADD COLUMN image TEXT").run();
  }
}

// Hash password function
async function hashPassword(password) {
  const SALT_ROUNDS = 10;
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Read projects data
const projectsPath = path.join(__dirname, 'data', 'projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Initialize database
const dbPath = path.join(__dirname, 'data.sqlite');
const db = new Database(dbPath);

// Run schema
db.exec(schema);

// Run migrations
migrate(db);

// Create admin account if not exists
const adminExists = db.prepare("SELECT id FROM admins LIMIT 1").get();
if (!adminExists) {
  const hashedPassword = await hashPassword("Admin@123");
  db.prepare(
    `INSERT INTO admins (email, password, name, role)
     VALUES (?, ?, ?, ?)`,
  ).run("admin@example.com", hashedPassword, "Admin", "super_admin");
  console.log("Admin account created");
}

// Insert projects
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let insertedCount = 0;
for (const project of projectsData) {
  try {
    insertStmt.run(
      project.id,
      project.slug,
      project.title,
      project.excerpt,
      project.image || '',
      JSON.stringify(project.categories || []),
      project.startDate || '',
      project.location || '',
      project.peopleHelped || '',
      project.status || 'Actif',
      JSON.stringify(project.content || []),
      JSON.stringify(project.goals || []),
      JSON.stringify(project.gallery || []),
      project.createdAt || new Date().toISOString(),
      project.updatedAt || new Date().toISOString()
    );
    insertedCount++;
  } catch (error) {
    console.error(`Error inserting project ${project.title}:`, error);
  }
}

console.log(`Database initialized successfully!`);
console.log(`Inserted ${insertedCount} projects`);
console.log(`Admin email: admin@example.com`);
console.log(`Admin password: Admin@123`);

db.close();