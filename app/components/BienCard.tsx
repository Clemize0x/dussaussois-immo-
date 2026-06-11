import Image from "next/image";
import Link from "next/link";
import { Bien } from "@/lib/types";
import { formatPrix, isNouveau, labelType } from "@/lib/biens";

interface Props {
  bien: Bien;
}

const STATUT_BADGE: Record<
  Bien["statut"],
  { label: string; className: string }
> = {
  disponible: { label: "Disponible", className: "bg-emerald-600 text-white" },
  sous_compromis: { label: "Sous compromis", className: "bg-amber-500 text-white" },
  vendu: { label: "Vendu", className: "bg-stone-500 text-white" },
};

export default function BienCard({ bien }: Props) {
  const photo = bien.photos[0] ?? null;
  const badge = STATUT_BADGE[bien.statut];
  const nouveau = isNouveau(bien);

  return (
    <Link
      href={`/biens/${bien.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={bien.titre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-300">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
            {badge.label}
          </span>
          {nouveau && bien.statut === "disponible" && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[color:var(--color-brand)] text-white">
              Nouveau
            </span>
          )}
        </div>

        {/* Type badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
            {labelType(bien.type)}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* Prix */}
        <p className="text-xl font-bold text-[color:var(--color-brand)] mb-1">
          {formatPrix(bien)}
        </p>

        {/* Titre */}
        <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 mb-2 group-hover:text-[color:var(--color-brand)] transition-colors">
          {bien.titre}
        </h3>

        {/* Localisation */}
        <p className="text-xs text-stone-500 mb-3 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {bien.ville} ({bien.codePostal})
        </p>

        {/* Specs */}
        {(bien.surface || bien.pieces || bien.chambres) && (
          <div className="flex items-center gap-4 text-xs text-stone-600 border-t border-stone-100 pt-3">
            {bien.surface && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {bien.surface} m²
              </span>
            )}
            {bien.pieces && (
              <span>{bien.pieces} pièce{bien.pieces > 1 ? "s" : ""}</span>
            )}
            {bien.chambres && (
              <span>{bien.chambres} ch.</span>
            )}
          </div>
        )}

        {/* Référence */}
        <p className="text-xs text-stone-400 mt-2">{bien.reference}</p>
      </div>
    </Link>
  );
}
