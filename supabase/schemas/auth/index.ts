import { AuthError, Session, User } from "npm:@supabase/supabase-js";
export interface ISignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
}
