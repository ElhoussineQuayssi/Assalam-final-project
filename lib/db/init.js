import { schema } from "./schema.js";

// Import auth only if available (for Next.js runtime)
let hashPassword = null;
try {
  const authModule = await import("../auth.js");
  hashPassword = authModule.hashPassword;
} catch {
  // Auth not available (standalone script), skip admin creation
  console.log("Auth module not available, skipping admin initialization");
}

export async function initializeDb(db) {
  try {
    // Create tables if they don't exist
    db.exec(schema);

    // Only create admin if hashPassword is available
    if (hashPassword) {
      // Check if admin exists
      const adminExists = db.prepare("SELECT id FROM admins LIMIT 1").get();

      if (!adminExists) {
        // Create default admin account
        const hashedPassword = await hashPassword("Admin@123");
        db.prepare(
          `INSERT INTO admins (email, password, name, role)
           VALUES (?, ?, ?, ?)`,
        ).run("admin@example.com", hashedPassword, "Admin", "super_admin");
      }
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    return null;
  }
}
