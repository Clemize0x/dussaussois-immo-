import Link from "next/link";
import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rowToBien, formatPrix, labelType } from "@/lib/biens";
import { deleteBien } from "./actions";

export const metadata: Metadata = {
  title: "Tableau de bord — Espace pro",
  robots: { index: false, follow: false },
};

const STATUT_BADGE: Record<string, string> = {
  disponible: "bg-emerald-100 text-emerald-700",
  sous_compromis: "bg-amber-100 text-amber-700",
  vendu: "bg-stone-200 text-stone-600",
};

const STATUT_LABEL: Record<string, string> = {
  disponible: "Disponible",
  sous_compromis: "Sous compromis",
  vendu: "Vendu",
};

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("biens")
    .select("*")
    .order("date_creation", { ascending: false });
  const biens = (data ?? []).map(rowToBien);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mes biens</h1>
          <p className="text-stone-500 text-sm">
            {biens.length} bien{biens.length > 1 ? "s" : ""} en ligne
          </p>
        </div>
        <Link
          href="/admin/biens/nouveau"
          className="rounded-md bg-[color:var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-dark)]"
        >
          + Ajouter un bien
        </Link>
      </div>

      {biens.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center text-stone-500">
          Aucun bien pour le moment. Cliquez sur « Ajouter un bien » pour commencer.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Titre</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Type</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Ville</th>
                <th className="px-4 py-3 font-medium">Prix</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {biens.map((bien) => (
                <tr key={bien.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-900">{bien.titre}</td>
                  <td className="px-4 py-3 text-stone-600 hidden sm:table-cell">
                    {labelType(bien.type)}
                  </td>
                  <td className="px-4 py-3 text-stone-600 hidden md:table-cell">{bien.ville}</td>
                  <td className="px-4 py-3 text-stone-600">{formatPrix(bien)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUT_BADGE[bien.statut] ?? "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {STATUT_LABEL[bien.statut] ?? bien.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/biens/${bien.id}/modifier`}
                        className="font-medium text-[color:var(--color-brand)] hover:underline"
                      >
                        Modifier
                      </Link>
                      <form action={deleteBien}>
                        <input type="hidden" name="id" value={bien.id} />
                        <button className="font-medium text-stone-400 hover:text-red-600">
                          Supprimer
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
