import { createUser } from "userService/user/createUser.ts";

Deno.serve(async (req) => {
  try {
    const { method } = req;

    if (method !== "POST") throw "Invalid Method";

    const requestBody = await req.json();

    const userBody = {
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

    if (userError) throw { error: userError };

    return new Response(
      JSON.stringify(userBody),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error }),
      { headers: { "Content-Type": "application/json" }, status: 501 },
    );
  }
});
