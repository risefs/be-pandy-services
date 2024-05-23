import { PostgrestError } from "https://esm.sh/v135/@supabase/supabase-js@2.43.1/dist/module/index.js";

export interface IUserCredentials {
  email: string;
  password: string;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}

export interface IUser {
  firstname: string;
  lastname: string;
  address: IAddress;
  email: string;
  uid?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUserResponse {
  message: string | null;
  error?: PostgrestError;
}
