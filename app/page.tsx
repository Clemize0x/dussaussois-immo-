import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBiens } from "@/lib/biens";
import BienCard from "./components/BienCard";
import QuickSearch from "./components/QuickSearch";
import HeroParallax from "./components/HeroParallax";

export const metadata: Metadata = {
  title: "Dussaussois Immobilier — Agence immobilière à Abondance, Haute-Savoie",
  description:
    "Achetez, vendez ou louez dans la vallée d'Abondance avec Dussaussois Immobilier. Chalets, appartements, fermes et programmes neufs aux Portes du Soleil.",
};

export default async function HomePage() {
  const allBiens = await getBiens();
  // Biens marqués "du moment" dans l'admin ; à défaut, les plus récents disponibles.
  const aLaUne = allBiens.filter((b) => b.aLaUne);
  const biensEnAvant = (aLaUne.length > 0
    ? aLaUne
    : allBiens.filter((b) => b.statut === "disponible"))
    .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
    .slice(0, 6);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <HeroParallax>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <p className="text-emerald-300 text-sm font-semibold tracking-widest uppercase mb-4">
              Vallée d&apos;Abondance — Haute-Savoie
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Votre bien,<br />votre horizon.
            </h1>
            <p className="text-lg text-stone-200 mb-8 leading-relaxed max-w-lg">
              Votre agence immobilière et votre courtier en assurance, au même
              endroit, dans la vallée d&apos;Abondance.
              De l&apos;achat de votre bien à sa protection, un seul interlocuteur.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/biens"
                className="px-6 py-3 rounded-md font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors text-sm sm:text-base"
              >
                Voir nos biens
              </Link>
              <Link
                href="/assurances"
                className="px-6 py-3 rounded-md font-semibold bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25 transition-colors text-sm sm:text-base"
              >
                Nos assurances
              </Link>
            </div>
          </div>
        </div>
      </HeroParallax>

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
            <p className="text-[color:var(--color-brand)] dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Sélection du moment
            </p>
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white">
              Nos biens du moment
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
      {/* NOS DEUX AXES                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-[color:var(--color-brand)] dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Une agence, deux savoir-faire
          </p>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white">Nos deux axes</h2>
          <p className="text-stone-600 dark:text-stone-300 mt-3 max-w-xl mx-auto">
            Acheter, vendre, et protéger ce qui compte : nous vous accompagnons sur
            toute la vie de votre bien, avec un seul interlocuteur de confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AXES.map(({ titre, baseline, texte, points, href, cta, image, imageAlt }) => (
            <article
              key={titre}
              className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-1">
                    {baseline}
                  </p>
                  <h3 className="text-2xl font-bold text-white">{titre}</h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{texte}</p>
                <ul className="space-y-2 mb-6">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-stone-700">
                      <svg
                        className="w-5 h-5 shrink-0 text-[color:var(--color-brand)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="mt-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-md text-sm font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors"
                >
                  {cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
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
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
          alt="Vallée verdoyante et montagnes"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[color:var(--color-brand)]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Un projet immobilier ou un besoin d&apos;assurance ?
          </h2>
          <p className="text-emerald-200 text-lg mb-8 max-w-xl mx-auto">
            Estimation de votre bien ou devis d&apos;assurance : sans engagement,
            et toujours avec le même interlocuteur de confiance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/estimation"
              className="inline-block px-8 py-4 rounded-md font-semibold text-[color:var(--color-brand)] bg-white hover:bg-stone-100 transition-colors text-base"
            >
              Estimer mon bien
            </Link>
            <Link
              href="/assurances"
              className="inline-block px-8 py-4 rounded-md font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/40 hover:bg-white/25 transition-colors text-base"
            >
              Demander un devis assurance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Données statiques
// ---------------------------------------------------------------------------

const AXES = [
  {
    titre: "Transaction immobilière",
    baseline: "Acheter · Vendre",
    texte:
      "Chalets, appartements, fermes et programmes neufs dans la vallée d'Abondance et les Portes du Soleil. Une connaissance fine du marché local, du premier rendez-vous à la remise des clés.",
    points: ["Vente & achat", "Programmes neufs", "Estimation de votre bien"],
    href: "/biens",
    cta: "Voir nos biens",
    image: "/Chalet.jpg",
    imageAlt: "Chalet en bois dans les Alpes",
  },
  {
    titre: "Courtage en assurance",
    baseline: "Protéger",
    texte:
      "Parce qu'un bien se protège autant qu'il s'acquiert, nous vous accompagnons sur l'ensemble de vos contrats, en toute indépendance, avec des solutions adaptées à votre situation.",
    points: ["Habitation & auto", "Santé & prévoyance", "Vie & décennale"],
    href: "/assurances",
    cta: "Découvrir nos assurances",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Conseil en assurance autour d'une table",
  },
];

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
