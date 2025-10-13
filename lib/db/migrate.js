export function migrate(db) {
  // Check if the 'image' column exists
  const columns = db.prepare("PRAGMA table_info(blog_posts)").all();
  const hasImageColumn = columns.some((col) => col.name === "image");

  if (!hasImageColumn) {
    db.prepare("ALTER TABLE blog_posts ADD COLUMN image TEXT").run();
  }
}
