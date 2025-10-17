import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create Supabase client directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Verifying Supabase connection...');
console.log('URL:', supabaseUrl ? 'Present' : 'Missing');
console.log('Service Key:', supabaseServiceKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function verifyConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Connection test failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful');
    console.log('✅ Database accessible');
    console.log('✅ Projects table exists and is accessible');

    return true;
  } catch (error) {
    console.error('❌ Connection verification failed:', error);
    return false;
  }
}

verifyConnection();