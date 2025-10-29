// Legacy `lib/db.js` kept for backward compatibility. Prefer importing
// `supabase` (client) from `lib/supabaseClient` in client code and
// `supabaseAdmin` from `lib/supabaseAdmin` in server code.

import { supabase } from "./supabaseClient";

export { supabase };
export default supabase;
