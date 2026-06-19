import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./config";

/**
 * Client Supabase côté serveur (Server Components, Server Actions, route handlers).
 * Lit/écrit la session via les cookies de la requête.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un Server Component : l'écriture de cookies est
          // interdite ici, mais le proxy rafraîchit la session — on ignore.
        }
      },
    },
  });
}
