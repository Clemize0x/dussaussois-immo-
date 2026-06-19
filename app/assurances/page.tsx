import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DevisForm from "./DevisForm";
import { TYPES_ASSURANCE } from "./types-assurance";

export const metadata: Metadata = {
  title: "Assurances — Vie, Auto, Santé, Habitation, Décennale",
  description:
    "Courtier en assurance dans la vallée d'Abondance : assurance vie, auto, santé, habitation et décennale. Conseil indépendant, un seul interlocuteur, devis gratuit sous 24 h.",
};

// ---------------------------------------------------------------------------
// Contenu des assurances — argumentaire + préoccupations adressées
// ---------------------------------------------------------------------------

type Assurance = {
  id: string;
  titre: string;
  accroche: string;
  texte: string;
  preoccupations: { peur: string; reponse: string }[];
  icon: React.ReactNode;
};

const ASSURANCES: Assurance[] = [
  {
    id: "vie",
    titre: "Assurance Vie",
    accroche: "Protégez vos proches, transmettez sereinement.",
    texte:
      "L'assurance vie reste le placement préféré des Français — encore faut-il qu'elle serve vraiment vos objectifs. Épargne, préparation de la retraite, transmission à vos enfants : nous construisons un contrat à votre image, et nous restons à vos côtés pour le faire évoluer dans le temps.",
    preoccupations: [
      {
        peur: "« J'ai peur de mal placer mon argent. »",
        reponse:
          "On part de votre situation et de votre tolérance au risque, pas d'un produit tout fait. Vous gardez la main, on vous explique chaque choix simplement.",
      },
      {
        peur: "« Et si mes proches étaient lésés ? »",
        reponse:
          "On rédige avec soin la clause bénéficiaire pour que votre capital aille exactement à qui vous voulez, dans le meilleur cadre fiscal.",
      },
      {
        peur: "« C'est bloqué, non ? »",
        reponse:
          "Non : votre épargne reste disponible à tout moment. On vous explique précisément les conditions de retrait.",
      },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
  },
  {
    id: "auto",
    titre: "Assurance Auto",
    accroche: "La bonne couverture, au juste prix.",
    texte:
      "Au tiers, intermédiaire ou tous risques : la bonne formule, c'est celle qui correspond à votre véhicule et à votre usage — sans payer pour des garanties inutiles, ni découvrir un trou dans le contrat le jour de l'accident. On compare pour vous et on vous conseille en toute indépendance.",
    preoccupations: [
      {
        peur: "« Je paie sûrement trop cher. »",
        reponse:
          "On met plusieurs assureurs en concurrence et on ajuste les garanties à votre usage réel. Beaucoup de nos clients y gagnent.",
      },
      {
        peur: "« Serai-je bien couvert en cas de pépin ? »",
        reponse:
          "On passe en revue les exclusions et les franchises avec vous, noir sur blanc, pour éviter les mauvaises surprises.",
      },
      {
        peur: "« Les démarches après un accident, c'est un cauchemar. »",
        reponse:
          "Un sinistre ? Vous nous appelez, on vous accompagne dans les démarches. Un interlocuteur que vous connaissez, pas un standard anonyme.",
      },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8m-9 0a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0zM5 17l1.5-5.5A2 2 0 018.4 10h7.2a2 2 0 011.9 1.5L19 17M6 11l-1-4h14l-1 4" />
    ),
  },
  {
    id: "sante",
    titre: "Assurance Santé",
    accroche: "Moins de reste à charge, plus de tranquillité.",
    texte:
      "Une bonne complémentaire santé, ce n'est pas la plus chère : c'est celle qui rembourse bien ce qui compte pour vous. Optique, dentaire, dépassements d'honoraires, hospitalisation… On analyse vos besoins réels — et ceux de votre famille — pour éviter aussi bien le sous- que le sur-remboursement.",
    preoccupations: [
      {
        peur: "« Les lunettes et le dentaire me coûtent une fortune. »",
        reponse:
          "On cible des garanties fortes là où vos dépenses sont réelles, pour faire fondre votre reste à charge.",
      },
      {
        peur: "« Je n'y comprends rien aux garanties. »",
        reponse:
          "On traduit le jargon en langage clair et on vous montre concrètement ce que vous toucheriez, exemple à l'appui.",
      },
      {
        peur: "« Ma mutuelle ne suit plus ma vie. »",
        reponse:
          "Vos besoins changent (enfant, retraite, santé) : on réajuste votre contrat au lieu de vous laisser payer pour l'inutile.",
      },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5M9 12h6m-3-3v6" />
    ),
  },
  {
    id: "habitation",
    titre: "Assurance Habitation",
    accroche: "Votre toit, votre refuge — vraiment protégé.",
    texte:
      "Résidence principale, appartement ou résidence secondaire en montagne : votre logement mérite mieux qu'un contrat standard. Dégâts des eaux, gel, poids de la neige, cambriolage en votre absence… En vallée d'Abondance, les risques sont spécifiques. On les connaît, et on couvre votre bien en conséquence.",
    preoccupations: [
      {
        peur: "« Ma résidence secondaire est vide une partie de l'année. »",
        reponse:
          "On choisit un contrat adapté à l'inoccupation saisonnière, gel et neige compris — fréquents et coûteux en montagne.",
      },
      {
        peur: "« En cas de gros sinistre, serai-je vraiment indemnisé ? »",
        reponse:
          "On vérifie les plafonds et les valeurs assurées pour que l'indemnisation corresponde à la réalité, pas à une estimation au rabais.",
      },
      {
        peur: "« Locataire ou propriétaire, je ne sais pas ce qu'il me faut. »",
        reponse:
          "On vous oriente vers la bonne formule selon votre statut, et on évite les doublons inutiles avec vos autres contrats.",
      },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    id: "decennale",
    titre: "Assurance Décennale",
    accroche: "Travaillez l'esprit libre, vous êtes en règle.",
    texte:
      "Vous êtes artisan ou professionnel du bâtiment ? La garantie décennale est une obligation légale — et votre meilleure alliée. Elle vous couvre dix ans sur les dommages qui compromettent la solidité de l'ouvrage. On vous trouve une couverture adaptée à votre métier, avec une attestation prête pour vos chantiers.",
    preoccupations: [
      {
        peur: "« C'est obligatoire et je n'ai pas le temps de m'en occuper. »",
        reponse:
          "On gère la mise en place de A à Z et on vous remet rapidement une attestation conforme à présenter à vos clients.",
      },
      {
        peur: "« Mon activité est particulière, vais-je être couvert ? »",
        reponse:
          "On cible un contrat qui correspond précisément à vos corps de métier, sans garanties manquantes le jour d'un litige.",
      },
      {
        peur: "« Les tarifs décennale, c'est l'inconnu. »",
        reponse:
          "On met plusieurs assureurs en concurrence pour obtenir le meilleur rapport garanties/prix pour votre activité.",
      },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
];

const ARGUMENTS_DEVIS = [
  {
    titre: "100 % gratuit, 0 engagement",
    texte: "Vous demandez, on étudie, vous décidez. Aucune obligation, aucune relance insistante.",
  },
  {
    titre: "On compare à votre place",
    texte: "Courtier indépendant, on met les assureurs en concurrence pour le meilleur rapport garanties/prix.",
  },
  {
    titre: "Réponse sous 24 h",
    texte: "Une proposition personnalisée sous 24 h ouvrées, expliquée par un interlocuteur qui vous connaît.",
  },
];

export default function AssurancesPage() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* HERO                                                               */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[color:var(--color-brand)] text-white">
        {/* Photo de fond : homme de dos face aux Alpes (placeholder Unsplash, à remplacer par une vraie photo) */}
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80"
          alt="Homme de dos contemplant les montagnes des Alpes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dégradé vert pour garder le texte lisible et l'identité « assurance » */}
        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-brand)]/95 via-[color:var(--color-brand)]/80 to-stone-900/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-emerald-300 text-sm font-semibold tracking-widest uppercase mb-4">
              Courtage en assurance
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Votre courtier en assurance, dans la vallée d&apos;Abondance.
            </h1>
            <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
              Vie, auto, santé, habitation, décennale : un conseil indépendant, des
              garanties à votre mesure, et un seul interlocuteur de confiance pour
              toute votre famille. On compare, on vous explique, vous choisissez.
            </p>
            <Link
              href="#devis"
              className="inline-block rounded-md bg-white px-7 py-3.5 font-semibold text-[color:var(--color-brand)] hover:bg-emerald-50 transition-colors"
            >
              Obtenir un devis gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SOMMAIRE DES ASSURANCES                                            */}
      {/* ----------------------------------------------------------------- */}
      <section className="border-b border-stone-200 bg-[color:var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-2 justify-center">
          {ASSURANCES.map((a) => (
            <a
              key={a.id}
              href={`#assurance-${a.id}`}
              className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm font-medium text-stone-700 hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
            >
              {a.titre}
            </a>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTIONS PAR ASSURANCE                                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {ASSURANCES.map((a) => (
          <article key={a.id} id={`assurance-${a.id}`} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand)]/10 text-[color:var(--color-brand)] dark:bg-emerald-400/10 dark:text-emerald-400">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {a.icon}
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white">{a.titre}</h2>
                <p className="text-[color:var(--color-brand)] dark:text-emerald-400 font-medium">
                  {a.accroche}
                </p>
              </div>
            </div>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-6">{a.texte}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {a.preoccupations.map((p) => (
                <div
                  key={p.peur}
                  className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <p className="font-semibold text-stone-900 mb-2">{p.peur}</p>
                  <p className="text-sm text-stone-600 leading-relaxed">{p.reponse}</p>
                </div>
              ))}
            </div>

            <a
              href={`#devis-${a.id}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-dark)] transition-colors"
            >
              Devis gratuit pour {a.titre.toLowerCase()}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </article>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* DEVIS GRATUIT                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section id="devis" className="scroll-mt-20 bg-[color:var(--color-surface)] py-16">
        {/* Ancres invisibles pour pré-sélectionner l'assurance + scroller ici */}
        {TYPES_ASSURANCE.map((t) => (
          <span key={t.value} id={`devis-${t.value}`} className="block h-0 scroll-mt-24" aria-hidden />
        ))}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="lg:pt-4">
            <p className="text-[color:var(--color-brand)] text-sm font-semibold tracking-widest uppercase mb-3">
              Devis gratuit
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4 leading-tight">
              2 minutes maintenant, des économies pour longtemps.
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              Dites-nous ce dont vous avez besoin : on étudie votre situation et on
              revient vers vous avec une proposition claire et personnalisée. Sans
              jargon, sans engagement.
            </p>

            <ul className="space-y-4">
              {ARGUMENTS_DEVIS.map((arg) => (
                <li key={arg.titre} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-white">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900">{arg.titre}</p>
                    <p className="text-sm text-stone-600">{arg.texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
            <DevisForm />
          </div>
        </div>
      </section>
    </>
  );
}
