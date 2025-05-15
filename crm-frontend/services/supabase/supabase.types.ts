import { Session, SupabaseClient } from "@supabase/supabase-js";

export type SupabaseContextType = {
  session?: Session;
  supabase: SupabaseClient;
  isLoading: boolean;
  logout:()=>void,
  refreshSession:()=>void
  // isAuthorized: (requiredRoles?: string | string[]) => boolean;
};


export type PropsHook = {
	required: boolean;
	redirect?: string;
	role?: string | string[];
};