import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

/**
 * Client Supabase "public" (lecture seule, sans session) pour afficher les
 * biens sur le site. Découplé de la requête : la lecture publique passe par
 * les règles RLS (lecture autorisée pour tous), pas par un utilisateur connecté.
 */
export function createSupabasePublicClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createClient(url!, anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
