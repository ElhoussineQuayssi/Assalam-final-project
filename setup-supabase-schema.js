import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create Supabase client directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupSupabaseSchema() {
  try {
    console.log('Setting up Supabase schema...');

    // Check if projects table exists
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .limit(1);

    if (tablesError && tablesError.code === 'PGRST116') {
      console.log('Projects table does not exist, creating it...');

      // Create the projects table
      const { error: createError } = await supabaseAdmin.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            image TEXT,
            categories JSONB NOT NULL DEFAULT '[]'::jsonb,
            start_date TEXT,
            location TEXT,
            people_helped TEXT,
            status TEXT DEFAULT 'Actif',
            content JSONB NOT NULL DEFAULT '[]'::jsonb,
            goals JSONB DEFAULT '[]'::jsonb,
            gallery JSONB DEFAULT '[]'::jsonb,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );

          -- Create index on slug for faster lookups
          CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

          -- Create index on created_at for sorting
          CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
        `
      });

      if (createError) {
        console.error('Error creating projects table:', createError);
        return;
      }

      console.log('Projects table created successfully!');
    } else {
      console.log('Projects table already exists');
    }

    console.log('Supabase schema setup completed!');
  } catch (error) {
    console.error('Schema setup failed:', error);
  }
}

setupSupabaseSchema();
