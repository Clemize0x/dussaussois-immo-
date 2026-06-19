/**
 * Lecture centralisée des variables d'environnement Supabase.
 * Tant qu'elles ne sont pas renseignées, le site fonctionne en mode "mock"
 * (données factices) et l'espace /admin affiche un message d'attente.
 */

export function getSupabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
}
