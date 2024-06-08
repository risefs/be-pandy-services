import { supabaseAdmin } from "shared/supabaseClient.ts";

export const rollbackUser = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
