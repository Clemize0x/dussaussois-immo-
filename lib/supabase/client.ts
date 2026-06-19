"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./config";

/**
 * Client Supabase côté navigateur (composants client).
 * Sert notamment à l'upload des photos vers le Storage.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient(url!, anonKey!);
}
