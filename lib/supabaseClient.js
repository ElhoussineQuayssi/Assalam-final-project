import { createClient } from "@supabase/supabase-js";

// Client-side Supabase instance
// Uses only public (NEXT_PUBLIC_) environment variables and is safe to import
// from client components.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createMissingProxy(name) {
  return new Proxy({}, {
    get() {
      throw new Error(
        `Supabase client (${name}) is not available because required environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`
      );
    },
    apply() {
      throw new Error(
        `Supabase client (${name}) is not available because required environment variables are missing.`
      );
    }
  });
}

let supabase;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // Provide a helpful proxy instead of throwing during build-time.
  // This makes local dev/builds clearer if envs are missing.
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing. Supabase client will be unavailable until env vars are provided.");
  supabase = createMissingProxy("supabase");
}

export { supabase };
export default supabase;
