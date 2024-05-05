import { supabase } from "../supabaseClient.ts";

Deno.serve(async () => {
  try {
    // const { name } = await req.json();
    // const data = {
    //   message: `Hello ${name}!`,
    // };
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "riserap92@gmail.com",
      password: "Test1234",
    });

    if (error) {
      console.log("Error", error);
    }

    console.log("Data", data);

    return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.log("Algo paso", error);

    return new Response(
      JSON.stringify(error),
      { headers: { "Content-Type": "application/json" } },
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
