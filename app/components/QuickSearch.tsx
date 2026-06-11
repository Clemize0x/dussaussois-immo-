"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuickSearch() {
  const router = useRouter();
  const [transaction, setTransaction] = useState("");
  const [type, setType] = useState("");
  const [ville, setVille] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transaction) params.set("transaction", transaction);
    if (type) params.set("type", type);
    if (ville) params.set("ville", ville);
    router.push(`/biens${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
    >
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Transaction
        </label>
        <select
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-transparent"
        >
          <option value="">Toutes</option>
          <option value="vente">Vente</option>
          <option value="location">Location</option>
          <option value="programme_neuf">Programme neuf</option>
        </select>
      </div>

      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Type de bien
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2.5 rounded-md border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-transparent"
        >
          <option value="">Tous</option>
          <option value="appartement">Appartement</option>
          <option value="chalet">Chalet</option>
          <option value="ferme">Ferme</option>
          <option value="propriete">Propriété</option>
          <option value="villa">Villa</option>
          <option value="bureau_commerce">Bureau / Commerce</option>
          <option value="programme_neuf">Programme neuf</option>
        </select>
      </div>

      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
          Ville ou commune
        </label>
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Ex. Abondance, Châtel…"
          className="w-full px-3 py-2.5 rounded-md border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-transparent placeholder:text-stone-400"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 rounded-md font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors text-sm shrink-0"
      >
        Rechercher
      </button>
    </form>
  );
}
