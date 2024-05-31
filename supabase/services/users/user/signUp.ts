import { IUserCredentials } from "schemas/users/user/index.ts";
import { ISignUpResponse } from "schemas/auth/index.ts";
import { supabase } from "@shared/supabaseClient.ts";

export const signUp = async (
  { email, password }: IUserCredentials,
): Promise<ISignUpResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return { data: null, error };
    }

    return {
      data,
      error,
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
