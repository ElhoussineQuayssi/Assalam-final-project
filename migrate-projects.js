import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
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

async function migrateProjects() {
  try {
    console.log('Reading projects data...');
    const projectsData = JSON.parse(fs.readFileSync('./data/projects.json', 'utf8'));

    console.log('Deleting all existing projects...');
    // Delete all projects
    const { error: deleteError } = await supabaseAdmin
      .from('projects')
      .delete()
      .neq('id', 'nonexistent-id'); // This should delete all if ids are not this value

    if (deleteError) {
      console.error('Error deleting projects:', deleteError);
      return;
    }

    console.log('Inserting new projects...');
    // Insert new projects, mapping createdAt to created_at
    const projectsToInsert = projectsData.map(project => ({
      ...project,
      created_at: project.createdAt,
      updated_at: new Date().toISOString(),
      // Remove the camelCase versions
      createdAt: undefined,
      updatedAt: undefined,
    })).filter(project => {
      delete project.createdAt;
      delete project.updatedAt;
      return true;
    });

    const { data, error: insertError } = await supabaseAdmin
      .from('projects')
      .insert(projectsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting projects:', insertError);
      return;
    }

    console.log(`Successfully migrated ${data.length} projects`);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateProjects();