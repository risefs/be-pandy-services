import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.43.1";

export const supabase: SupabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

export const supabaseAdmin: SupabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);
