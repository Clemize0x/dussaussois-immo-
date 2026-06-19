import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import BienForm from "../BienForm";
import { createBien } from "../../actions";

export const metadata: Metadata = {
  title: "Ajouter un bien — Espace pro",
  robots: { index: false, follow: false },
};

export default function NouveauBienPage() {
  if (!isSupabaseConfigured()) return null;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Ajouter un bien</h1>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <BienForm action={createBien} submitLabel="Créer le bien" />
      </div>
    </div>
  );
}
