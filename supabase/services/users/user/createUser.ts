import { supabase } from "../../../functions/supabaseClient.ts";
import { IUser } from "schemas/users/user/index.ts";

export const createUser = async (user: IUser) => {
  try {
    const { data, error } = await supabase.from("users").insert(user);

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
