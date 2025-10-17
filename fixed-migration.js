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

    console.log('Clearing existing projects...');
    // Delete all projects first
    const { error: deleteError } = await supabaseAdmin
      .from('projects')
      .delete()
      .neq('id', 'nonexistent-id');

    if (deleteError) {
      console.error('Error deleting projects:', deleteError);
      return;
    }

    console.log('Inserting new projects...');

    // Convert camelCase to snake_case for all projects
    const projectsToInsert = projectsData.map(project => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      excerpt: project.excerpt,
      image: project.image || null,
      categories: project.categories || [],
      start_date: project.startDate || null,
      location: project.location || null,
      people_helped: project.peopleHelped || null,
      status: project.status || 'Actif',
      content: project.content || [],
      goals: project.goals || [],
      gallery: project.gallery || [],
      created_at: project.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    console.log(`Migrating ${projectsToInsert.length} projects...`);

    const { data, error: insertError } = await supabaseAdmin
      .from('projects')
      .insert(projectsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting projects:', insertError);
      return;
    }

    console.log(`Successfully migrated ${data.length} projects`);

    // Verify by fetching one project
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('projects')
      .select('id, title, slug')
      .limit(1);

    if (verifyError) {
      console.error('Error verifying migration:', verifyError);
    } else {
      console.log('Verification successful. Sample project:', verifyData[0]);
    }

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateProjects();
