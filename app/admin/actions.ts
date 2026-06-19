"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AuthState = { error: string };

// --- Authentification -------------------------------------------------------

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) {
    return { error: "Le back-office n'est pas encore configuré (clés Supabase manquantes)." };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "E-mail ou mot de passe incorrect." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// --- CRUD des biens ---------------------------------------------------------

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function num(value: FormDataEntryValue | null): number | null {
  const s = String(value ?? "").trim();
  if (s === "") return null;
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function rowFromForm(formData: FormData) {
  const titre = String(formData.get("titre") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  let photos: string[] = [];
  try {
    photos = JSON.parse(String(formData.get("photos") ?? "[]"));
  } catch {
    photos = [];
  }
  return {
    titre,
    slug: slugify(slugInput || titre) || `bien-${Date.now()}`,
    transaction: String(formData.get("transaction") ?? "vente"),
    type: String(formData.get("type") ?? "appartement"),
    statut: String(formData.get("statut") ?? "disponible"),
    ville: String(formData.get("ville") ?? "").trim(),
    code_postal: String(formData.get("codePostal") ?? "").trim(),
    prix: num(formData.get("prix")),
    surface: num(formData.get("surface")),
    pieces: num(formData.get("pieces")),
    chambres: num(formData.get("chambres")),
    description: String(formData.get("description") ?? "").trim(),
    reference: String(formData.get("reference") ?? "").trim(),
    a_la_une: formData.get("aLaUne") === "on",
    latitude: num(formData.get("latitude")),
    longitude: num(formData.get("longitude")),
    photos: Array.isArray(photos) ? photos : [],
  };
}

export async function createBien(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("biens").insert(rowFromForm(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/biens");
  redirect("/admin");
}

export async function updateBien(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("biens").update(rowFromForm(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/biens");
  redirect("/admin");
}

export async function deleteBien(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("biens").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/biens");
}
