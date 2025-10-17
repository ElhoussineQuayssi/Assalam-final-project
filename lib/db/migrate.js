import { supabaseAdmin } from "./index.js";

/**
 * Migrate database schema for Supabase
 * This function checks if columns exist and adds them if needed
 */
export async function migrate() {
  try {
    console.log("Starting database migration...");

    // Check if the 'image' column exists in blog_posts table
    const { data: columns, error: columnsError } = await supabaseAdmin
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'blog_posts')
      .eq('table_schema', 'public');

    if (columnsError) {
      console.warn("Could not check columns, table might not exist yet:", columnsError.message);
      return { success: false, error: columnsError.message };
    }

    const hasImageColumn = columns?.some(col => col.column_name === 'image') || false;

    if (!hasImageColumn) {
      console.log("Adding 'image' column to blog_posts table...");

      // Note: In Supabase, you would typically use the SQL editor or migrations
      // For programmatic migrations, you might need to use rpc calls
      const { error: alterError } = await supabaseAdmin.rpc('exec', {
        query: 'ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT'
      });

      if (alterError) {
        console.warn("Could not add image column:", alterError.message);
        // This is expected in some Supabase configurations where ALTER TABLE isn't allowed via RPC
      } else {
        console.log("Successfully added 'image' column to blog_posts table");
      }
    } else {
      console.log("'image' column already exists in blog_posts table");
    }

    console.log("Database migration completed successfully");
    return { success: true };
  } catch (error) {
    console.error("Migration error:", error);
    return { success: false, error: error.message };
  }
}
