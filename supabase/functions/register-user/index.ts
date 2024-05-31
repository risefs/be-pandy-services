import { signUp } from "userService/index.ts";
import { createUser } from "userService/user/createUser.ts";
import { rollbackUser } from "userService/user/rollbackUser.ts";
import { corsHeaders } from "@shared/cors.ts";

Deno.serve(async (req) => {
  try {
    const { method } = req;

    if (method !== "POST") throw "Invalid Method";

    const requestBody = await req.json();
    if (!requestBody?.email || !requestBody.password) {
      return new Response(JSON.stringify({ error: "Missing requestBody" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const { error, data } = await signUp({
      email: requestBody.email,
      password: requestBody.password,
    });

    if (error || !data?.user?.id) throw { error, uid: data?.user?.id };

    const userBody = {
      uid: data?.user?.id,
      email: requestBody.email,
      firstname: requestBody.firstname,
      lastname: requestBody.lastname,
      address: {
        city: requestBody?.address?.city,
        latitude: requestBody?.address?.latitude,
        longitude: requestBody?.address?.longitude,
        state: requestBody?.address?.state,
        street: requestBody?.address?.street,
        zipcode: requestBody?.address?.zipcode,
      },
      created_at: new Date(),
      updated_at: new Date(),
    };
    const { error: userError } = await createUser(userBody);

    if (userError) throw { error: userError, uid: data?.user?.id };

    return new Response(
      JSON.stringify(userBody),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    if (error.code !== "user_already_exists" && error.uid) {
      await rollbackUser(error.uid);
    }

    return new Response(
      JSON.stringify({ error: error }),
      { headers: { "Content-Type": "application/json" }, status: 501 },
    );
  }
});
