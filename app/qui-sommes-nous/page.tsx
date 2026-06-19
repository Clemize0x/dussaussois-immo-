import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Qui sommes-nous — l'agence Dussaussois",
  description:
    "Dussaussois Immobilier & Assurance : une agence familiale de la vallée d'Abondance. Cécile et Franck Dussaussois vous accompagnent en immobilier comme en assurance.",
};

type Membre = {
  nom: string;
  role: string;
  photo: string;
  bio: string;
};

const EQUIPE: Membre[] = [
  {
    nom: "Cécile Dussaussois",
    role: "Transaction immobilière",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    bio: "Cécile pilote l'activité immobilière. De la première visite à la signature, elle connaît chaque versant de la vallée et vous accompagne avec franchise pour vendre ou trouver le bien qui vous ressemble.",
  },
  {
    nom: "Franck Dussaussois",
    role: "Courtage en assurance",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
    bio: "Franck est votre interlocuteur assurance : vie, auto, santé, habitation, décennale. Indépendant, il compare pour vous et vous explique chaque garantie simplement — et épaule Cécile sur l'immobilier quand il le faut.",
  },
];

const VALEURS = [
  {
    titre: "Une agence familiale",
    texte: "Pas un réseau anonyme : deux personnes que vous connaissez par leur prénom, du premier appel au suivi dans la durée.",
    // icône : groupe de personnes
    icone: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    titre: "Ancrés dans la vallée",
    texte: "Établis à Abondance, au cœur du domaine des Portes du Soleil, nous connaissons le terrain, les biens et les besoins d'ici mieux que personne.",
    // icône : montagnes
    icone: "M3 20l6-11 4 6 2-3 6 8H3z",
  },
  {
    titre: "Un seul interlocuteur",
    texte: "Immobilier et assurance sous le même toit : vous achetez votre bien avec nous, vous le protégez avec nous.",
    // icône : poignée de main / interlocuteur unique
    icone: "M12 14a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  },
];

export default function QuiSommesNousPage() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* INTRO                                                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 text-center">
        <p className="text-[color:var(--color-brand)] dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Qui sommes-nous
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mb-5 leading-tight">
          Une agence familiale au cœur de la vallée d&apos;Abondance.
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Depuis plus de 20 ans, nous accompagnons les habitants de la vallée pour
          deux moments qui comptent&nbsp;: trouver — ou vendre — leur bien, et le
          protéger. Deux métiers, un seul état d&apos;esprit&nbsp;: la proximité et
          la confiance.
        </p>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* L'ÉQUIPE                                                           */}
      {/* ----------------------------------------------------------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {EQUIPE.map((m) => (
            <article
              key={m.nom}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={m.photo}
                  alt={m.nom}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-stone-900">{m.nom}</h2>
                <p className="text-[color:var(--color-brand)] font-medium text-sm mb-3">
                  {m.role}
                </p>
                <p className="text-stone-600 text-sm leading-relaxed">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* VALEURS                                                            */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-[color:var(--color-surface)] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALEURS.map((v) => (
            <div key={v.titre}>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={v.icone} />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-stone-900">{v.titre}</h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{v.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* CTA LÉGER                                                          */}
      {/* ----------------------------------------------------------------- */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3">
          Envie d&apos;échanger&nbsp;?
        </h2>
        <p className="text-stone-600 dark:text-stone-300 mb-6">
          Un projet, une question, ou simplement l&apos;envie de faire connaissance —
          la porte est ouverte.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--color-brand)] px-6 py-3 font-semibold text-[color:var(--color-brand)] dark:border-emerald-400 dark:text-emerald-400 hover:bg-[color:var(--color-brand)] hover:text-white dark:hover:bg-emerald-400 dark:hover:text-stone-900 transition-colors"
        >
          Discutons-en
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </>
  );
}
