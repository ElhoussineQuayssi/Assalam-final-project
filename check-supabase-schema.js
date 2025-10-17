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

async function checkSupabaseSchema() {
  try {
    console.log('Checking Supabase projects table schema...');

    // Try to query the projects table to see what columns exist
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .limit(1);

    if (error) {
      console.log('Error querying projects table:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log('Columns in projects table:', Object.keys(data[0]));
    } else {
      console.log('Projects table exists but is empty');
    }

    // Check if we can insert a test record with all expected columns
    const testProject = {
      id: 'test-' + Date.now(),
      slug: 'test-project',
      title: 'Test Project',
      excerpt: 'Test excerpt',
      image: null,
      categories: [],
      start_date: '2024-01-01',
      location: 'Test Location',
      people_helped: '100 people',
      status: 'Actif',
      content: [],
      goals: [],
      gallery: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error: insertError } = await supabaseAdmin
      .from('projects')
      .insert(testProject);

    if (insertError) {
      console.log('Insert test failed:', insertError.message);
      console.log('Missing or incorrect columns:', insertError.details || 'Unknown');
    } else {
      console.log('Test insert successful!');
      // Clean up test record
      await supabaseAdmin
        .from('projects')
        .delete()
        .eq('id', testProject.id);
    }

  } catch (error) {
    console.error('Schema check failed:', error);
  }
}

checkSupabaseSchema();
