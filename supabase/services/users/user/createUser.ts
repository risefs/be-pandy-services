import { SUCCESSFUL_MESSAGE } from "../../../functions/_shared/constants.js";
import { ICreateUserResponse, IUser } from "schemas/users/user/index.ts";
import { supabase } from "@shared/supabaseClient.ts";

export const createUser = async (user: IUser): Promise<ICreateUserResponse> => {
  try {
    const { error } = await supabase.from("users").insert(user);

    if (error) {
      return { message: null, error };
    }

    return { message: SUCCESSFUL_MESSAGE };
  } catch (error) {
    return { message: null, error: error.message };
  }
};
