import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseConfigType } from "./types";
import { supabaseConfig } from "./config";
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { parseCookies, setCookie } from 'nookies';

export class SupabaseAuthClient {
  private SupabaseClient!: SupabaseClient;
  private config: SupabaseConfigType;

  constructor() {
    this.config = supabaseConfig;
  }

  getBrowserclient() {
    return (this.SupabaseClient = createBrowserClient(
      this.config.supabaseurl,
      this.config.supabaseAnonKey,
      {
        cookies: {
          getAll() {
            const cookies = parseCookies();
            return Object.entries(cookies).map(([name, value]) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              setCookie(null, name, value, options); // for example, using 'nookies'
            });
          },
        },
      }
    ));
  }

//   async getServerClient() {
//     const cookieStore = await cookies();

//     return createServerClient(
//       this.config.supabaseurl,
//       this.config.supabaseAnonKey,
//       {
//         cookies: {
//           getAll() {
//             return cookieStore.getAll();
//           },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 cookieStore.set(name, value, options)
//               );
//             } catch {
//               // The `setAll` method was called from a Server Component.
//               // This can be ignored if you have middleware refreshing
//               // user sessions.
//             }
//           },
//         },
//       }
//     );
//   }
}
