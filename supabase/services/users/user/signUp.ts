import { supabase } from "../../../functions/supabaseClient.ts";
import { IUserCredentials } from "schemas/users/user/index.ts";

export const signUp = async ({ email, password }: IUserCredentials) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
