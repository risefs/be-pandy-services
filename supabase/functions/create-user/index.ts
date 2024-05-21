import { signUp } from "userService/index.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  try {
    const { method } = req;

    if (method !== "POST") throw "Invalid Method";

    const credentials = await req.json();
    if (!credentials?.email || !credentials.password) {
      return new Response(JSON.stringify({ error: "Missing Credentials" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const response = await signUp({
      email: credentials.email,
      password: credentials.password,
    });

    return new Response(
      JSON.stringify(response),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error }),
      { headers: { "Content-Type": "application/json" }, status: 501 },
    );
  }
});
