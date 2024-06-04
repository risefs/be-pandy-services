import { supabase } from "shared/supabaseClient.ts";

Deno.serve(async (req) => {
  try {
    const { method } = req;

    if (method !== "POST") throw "Invalid Method";

    const credentials = await req.json();
    if (!credentials?.email || !credentials.password) {
      return new Response(JSON.stringify({ error: "Missing Credentials" }), {
        status: 400,
      });
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials?.email,
      password: credentials.password,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.name }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error }),
      { headers: { "Content-Type": "application/json" }, status: 501 },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/login' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
