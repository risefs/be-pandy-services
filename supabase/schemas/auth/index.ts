import { AuthError } from "https://esm.sh/v135/@supabase/supabase-js@2.43.1/dist/module/index.js";
import { User } from "https://esm.sh/v135/@supabase/supabase-js@2.43.1/dist/module/index.js";
import { Session } from "https://esm.sh/v135/@supabase/supabase-js@2.43.1/dist/module/index.js";

export interface ISignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
}
