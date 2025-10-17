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

async function checkProjectsData() {
  try {
    console.log('Checking projects data in database...');

    // Get count of projects
    const { data: projects, error: countError } = await supabaseAdmin
      .from('projects')
      .select('id, title, slug, status')
      .limit(20);

    if (countError) {
      console.error('Error querying projects:', countError.message);
      return;
    }

    console.log(`Found ${projects.length} projects in database:`);
    projects.forEach(project => {
      console.log(`- ${project.title} (${project.slug}) - Status: ${project.status}`);
    });

    if (projects.length === 0) {
      console.log('No projects found in database. Data may not have been inserted yet.');
    }

  } catch (error) {
    console.error('Check failed:', error);
  }
}

checkProjectsData();