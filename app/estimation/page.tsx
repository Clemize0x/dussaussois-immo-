import type { Metadata } from "next";
import EstimationForm from "./EstimationForm";

export const metadata: Metadata = {
  title: "Estimez votre bien — sans engagement",
  description:
    "Demandez l'estimation de votre bien dans la vallée d'Abondance. Appartement, terrain ou commerce : nos experts du marché local vous recontactent rapidement.",
};

const ATOUTS = [
  "Estimation sans engagement",
  "Une connaissance fine du marché de la vallée d'Abondance",
  "Un seul interlocuteur, de l'estimation à la signature",
];

export default function EstimationPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Colonne gauche : présentation */}
        <div className="lg:pt-4">
          <p className="text-[color:var(--color-brand)] dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Estimez votre bien
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mb-5 leading-tight">
            Quelle est la valeur de votre bien&nbsp;?
          </h1>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
            Vous envisagez de vendre&nbsp;? Obtenez une première estimation
            réalisée par nos soins, fondée sur notre connaissance du marché local
            et les transactions récentes de la vallée. Remplissez ce formulaire,
            nous revenons vers vous rapidement.
          </p>

          <ul className="space-y-3">
            {ATOUTS.map((atout) => (
              <li
                key={atout}
                className="flex items-start gap-3 text-stone-700 dark:text-stone-300"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--color-brand)] dark:text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {atout}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <EstimationForm />
        </div>
      </div>
    </section>
  );
}
