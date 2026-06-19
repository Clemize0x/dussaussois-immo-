import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rowToBien } from "@/lib/biens";
import BienForm from "../../BienForm";
import { updateBien } from "../../../actions";

export const metadata: Metadata = {
  title: "Modifier un bien — Espace pro",
  robots: { index: false, follow: false },
};

export default async function ModifierBienPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured()) return null;

  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("biens").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const bien = rowToBien(data);
  const updateWithId = updateBien.bind(null, id);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Modifier — {bien.titre}</h1>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <BienForm bien={bien} action={updateWithId} submitLabel="Enregistrer les modifications" />
      </div>
    </div>
  );
}
