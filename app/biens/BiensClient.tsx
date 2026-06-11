"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bien, TypeTransaction, TypeBien } from "@/lib/types";
import { formatPrix, labelTransaction, labelType } from "@/lib/biens";
import BienCard from "@/app/components/BienCard";

type SortKey = "date" | "prix_asc" | "prix_desc";

const TRANSACTIONS: { value: TypeTransaction | ""; label: string }[] = [
  { value: "", label: "Toutes" },
  { value: "vente", label: "Vente" },
  { value: "location", label: "Location" },
  { value: "programme_neuf", label: "Programme neuf" },
];

const TYPES: { value: TypeBien | ""; label: string }[] = [
  { value: "", label: "Tous" },
  { value: "appartement", label: "Appartement" },
  { value: "chalet", label: "Chalet" },
  { value: "ferme", label: "Ferme" },
  { value: "propriete", label: "Propriété" },
  { value: "villa", label: "Villa" },
  { value: "bureau_commerce", label: "Bureau / Commerce" },
  { value: "programme_neuf", label: "Programme neuf" },
];

const BUDGET_OPTIONS = [
  { value: "", label: "Budget max" },
  { value: "200000", label: "200 000 €" },
  { value: "350000", label: "350 000 €" },
  { value: "500000", label: "500 000 €" },
  { value: "750000", label: "750 000 €" },
  { value: "1000000", label: "1 000 000 €" },
];

const PIECES_OPTIONS = [
  { value: "", label: "Toutes tailles" },
  { value: "2", label: "2 pièces min." },
  { value: "3", label: "3 pièces min." },
  { value: "4", label: "4 pièces min." },
  { value: "5", label: "5 pièces min." },
];

interface Props {
  biens: Bien[];
  initialTransaction?: string;
  initialType?: string;
  initialVille?: string;
}

export default function BiensClient({
  biens,
  initialTransaction = "",
  initialType = "",
  initialVille = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transaction, setTransaction] = useState(initialTransaction);
  const [type, setType] = useState(initialType);
  const [ville, setVille] = useState(initialVille);
  const [budgetMax, setBudgetMax] = useState("");
  const [piecesMin, setPiecesMin] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Mise à jour de l'URL quand les filtres changent
  function updateUrl(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    router.replace(`/biens${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }

  function handleTransaction(v: string) {
    setTransaction(v);
    updateUrl({ transaction: v });
  }
  function handleType(v: string) {
    setType(v);
    updateUrl({ type: v });
  }
  function handleVille(v: string) {
    setVille(v);
    updateUrl({ ville: v });
  }

  function resetFilters() {
    setTransaction("");
    setType("");
    setVille("");
    setBudgetMax("");
    setPiecesMin("");
    router.replace("/biens", { scroll: false });
  }

  // Filtrage et tri
  const filtered = useMemo(() => {
    let result = biens;
    if (transaction) result = result.filter((b) => b.transaction === transaction);
    if (type) result = result.filter((b) => b.type === type);
    if (ville) result = result.filter((b) =>
      b.ville.toLowerCase().includes(ville.toLowerCase())
    );
    if (budgetMax) {
      const max = parseInt(budgetMax, 10);
      result = result.filter((b) => b.prix === null || b.prix <= max);
    }
    if (piecesMin) {
      const min = parseInt(piecesMin, 10);
      result = result.filter((b) => b.pieces === null || b.pieces >= min);
    }
    return result;
  }, [biens, transaction, type, ville, budgetMax, piecesMin]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "prix_asc") return (a.prix ?? Infinity) - (b.prix ?? Infinity);
      if (sortBy === "prix_desc") return (b.prix ?? 0) - (a.prix ?? 0);
      return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    });
  }, [filtered, sortBy]);

  const hasActiveFilters = Boolean(transaction || type || ville || budgetMax || piecesMin);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête de page */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Nos biens</h1>
        <p className="text-stone-500 text-sm">
          {sorted.length} bien{sorted.length !== 1 ? "s" : ""} trouvé{sorted.length !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-3 text-[color:var(--color-brand)] underline hover:no-underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </p>
      </div>

      {/* Filtres — version mobile (accordéon) */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-stone-300 text-sm font-medium text-stone-700 bg-white w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filtres {hasActiveFilters && <span className="bg-[color:var(--color-brand)] text-white text-xs rounded-full px-1.5">!</span>}
          </span>
          <svg className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {filtersOpen && (
          <div className="mt-3 p-4 bg-[color:var(--color-surface)] rounded-xl border border-stone-200">
            <FiltersForm
              transaction={transaction}
              type={type}
              ville={ville}
              budgetMax={budgetMax}
              piecesMin={piecesMin}
              onTransaction={handleTransaction}
              onType={handleType}
              onVille={handleVille}
              onBudgetMax={setBudgetMax}
              onPiecesMin={setPiecesMin}
            />
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar filtres desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-[color:var(--color-surface)] rounded-xl border border-stone-200 p-5">
            <p className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[color:var(--color-brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filtres
            </p>
            <FiltersForm
              transaction={transaction}
              type={type}
              ville={ville}
              budgetMax={budgetMax}
              piecesMin={piecesMin}
              onTransaction={handleTransaction}
              onType={handleType}
              onVille={handleVille}
              onBudgetMax={setBudgetMax}
              onPiecesMin={setPiecesMin}
            />
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-4 w-full text-xs text-center text-stone-500 hover:text-stone-800 underline"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </aside>

        {/* Grille */}
        <div className="flex-1 min-w-0">
          {/* Barre de tri */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              {sorted.length} résultat{sorted.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs text-stone-500 hidden sm:block">Trier par :</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="text-sm border border-stone-300 rounded-md px-2 py-1.5 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]"
              >
                <option value="date">Les plus récents</option>
                <option value="prix_asc">Prix croissant</option>
                <option value="prix_desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {sorted.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {sorted.map((bien) => (
                <BienCard key={bien.id} bien={bien} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sous-composants
// ---------------------------------------------------------------------------

interface FiltersFormProps {
  transaction: string;
  type: string;
  ville: string;
  budgetMax: string;
  piecesMin: string;
  onTransaction: (v: string) => void;
  onType: (v: string) => void;
  onVille: (v: string) => void;
  onBudgetMax: (v: string) => void;
  onPiecesMin: (v: string) => void;
}

function FiltersForm({
  transaction, type, ville, budgetMax, piecesMin,
  onTransaction, onType, onVille, onBudgetMax, onPiecesMin,
}: FiltersFormProps) {
  return (
    <div className="space-y-4">
      <FilterGroup label="Transaction">
        <select
          value={transaction}
          onChange={(e) => onTransaction(e.target.value)}
          className={selectClass}
        >
          {TRANSACTIONS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Type de bien">
        <select value={type} onChange={(e) => onType(e.target.value)} className={selectClass}>
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Ville / commune">
        <input
          type="text"
          value={ville}
          onChange={(e) => onVille(e.target.value)}
          placeholder="Ex. Abondance…"
          className={selectClass + " placeholder:text-stone-400"}
        />
      </FilterGroup>

      <FilterGroup label="Budget maximum">
        <select value={budgetMax} onChange={(e) => onBudgetMax(e.target.value)} className={selectClass}>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Nombre de pièces">
        <select value={piecesMin} onChange={(e) => onPiecesMin(e.target.value)} className={selectClass}>
          {PIECES_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </FilterGroup>
    </div>
  );
}

const selectClass =
  "w-full px-3 py-2 rounded-md border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-transparent";

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-20">
      <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <h3 className="text-lg font-semibold text-stone-700 mb-2">Aucun bien ne correspond</h3>
      <p className="text-stone-500 text-sm mb-4">Essayez d&apos;élargir vos critères de recherche.</p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-md text-sm font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors"
      >
        Voir tous les biens
      </button>
    </div>
  );
}
