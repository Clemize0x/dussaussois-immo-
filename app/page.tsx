import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBiens } from "@/lib/biens";
import BienCard from "./components/BienCard";
import QuickSearch from "./components/QuickSearch";

export const metadata: Metadata = {
  title: "Dussaussois Immobilier — Agence immobilière à Abondance, Haute-Savoie",
  description:
    "Achetez, vendez ou louez dans la vallée d'Abondance avec Dussaussois Immobilier. Chalets, appartements, fermes et programmes neufs aux Portes du Soleil.",
};

export default async function HomePage() {
  const allBiens = await getBiens();
  const biensEnAvant = allBiens
    .filter((b) => b.statut === "disponible")
    .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
    .slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-[90vh] min-h-[560px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85"
          alt="Vue sur les Alpes — vallée d'Abondance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <p className="text-emerald-300 text-sm font-semibold tracking-widest uppercase mb-4">
              Vallée d&apos;Abondance — Haute-Savoie
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Votre bien,<br />votre horizon.
            </h1>
            <p className="text-lg text-stone-200 mb-8 leading-relaxed max-w-lg">
              Spécialiste de l&apos;immobilier dans les Portes du Soleil depuis plus de 20 ans.
              Chalets, appartements, fermes — nous connaissons chaque vallée, chaque versant.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/biens"
                className="px-6 py-3 rounded-md font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors text-sm sm:text-base"
              >
                Voir nos biens
              </Link>
              <Link
                href="/estimation"
                className="px-6 py-3 rounded-md font-semibold bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25 transition-colors text-sm sm:text-base"
              >
                Estimer mon bien
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BARRE DE RECHERCHE RAPIDE                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[color:var(--color-surface)] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <QuickSearch />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BIENS EN AVANT                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[color:var(--color-brand)] text-sm font-semibold tracking-widest uppercase mb-2">
              Sélection du moment
            </p>
            <h2 className="text-3xl font-bold text-stone-900">
              Nos biens à la vente
            </h2>
          </div>
          <Link
            href="/biens"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-brand)] hover:underline"
          >
            Tout voir
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {biensEnAvant.map((bien) => (
            <BienCard key={bien.id} bien={bien} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/biens"
            className="inline-block px-6 py-3 rounded-md text-sm font-semibold bg-[color:var(--color-brand)] text-white"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* POURQUOI NOUS CHOISIR                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[color:var(--color-surface)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[color:var(--color-brand)] text-sm font-semibold tracking-widest uppercase mb-2">
              L&apos;agence
            </p>
            <h2 className="text-3xl font-bold text-stone-900">
              Une expertise locale depuis 20 ans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ATOUTS.map(({ icon, titre, texte }) => (
              <div key={titre} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)] mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{titre}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ESTIMATION CTA                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80"
          alt="Chalet en montagne"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[color:var(--color-brand)]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Vous souhaitez vendre ?
          </h2>
          <p className="text-emerald-200 text-lg mb-8 max-w-xl mx-auto">
            Obtenez une estimation gratuite et sans engagement de votre bien par
            nos experts du marché alpin.
          </p>
          <Link
            href="/estimation"
            className="inline-block px-8 py-4 rounded-md font-semibold text-[color:var(--color-brand)] bg-white hover:bg-stone-100 transition-colors text-base"
          >
            Estimer gratuitement mon bien
          </Link>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Données statiques
// ---------------------------------------------------------------------------

const ATOUTS = [
  {
    titre: "Ancrage local",
    texte:
      "Nés et établis dans la vallée d'Abondance, nous connaissons chaque bien, chaque micro-marché, chaque opportunité.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titre: "Transaction sécurisée",
    texte:
      "Carte professionnelle, garantie financière : chaque transaction est encadrée de A à Z dans les règles de l'art.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    titre: "Accompagnement complet",
    texte:
      "Immobilier et assurance sous le même toit : nous vous accompagnons bien au-delà de la remise des clés.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];
