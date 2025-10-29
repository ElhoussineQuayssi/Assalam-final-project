import { createClient } from "@supabase/supabase-js";

// Server/admin Supabase instance
// Uses the SUPABASE_SERVICE_ROLE_KEY and must never be imported into client code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function createMissingProxy(name) {
  return new Proxy({}, {
    get() {
      throw new Error(
        `Supabase admin client (${name}) is not available because required environment variables are missing. Please set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL on the server.`
      );
    },
    apply() {
      throw new Error(
        `Supabase admin client (${name}) is not available because required environment variables are missing.`
      );
    }
  });
}

let supabaseAdmin;

if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    // For admin/service usage we typically do not persist client-side sessions
    auth: { autoRefreshToken: false, persistSession: false },
  });
} else {
  // eslint-disable-next-line no-console
  console.warn("SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL missing. Supabase admin client will be unavailable until env vars are provided.");
  supabaseAdmin = createMissingProxy("supabaseAdmin");
}

export { supabaseAdmin };
export default supabaseAdmin;
