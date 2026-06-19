import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Dussaussois Immobilier & Assurance",
  description:
    "Contactez Dussaussois Immobilier & Assurance à Abondance : 39 Chemin de la Grangette, 74360 Abondance. Téléphone, e-mail, horaires et formulaire de contact.",
};

const TELEPHONES = [
  { affichage: "+33 (0)6 12 44 37 92", tel: "+33612443792" },
  { affichage: "+33 (0)4 50 73 43 51", tel: "+33450734351" },
];

const EMAIL = "f.dussaussois@dussaussoisimmobilier.com";
const ADRESSE = "39 Chemin de la Grangette, 74360 Abondance";
const MAP_SRC =
  "https://www.google.com/maps?q=39+Chemin+de+la+Grangette,+74360+Abondance&output=embed";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="text-center mb-12">
        <p className="text-[color:var(--color-brand)] dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Contact
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white leading-tight">
          Parlons de votre projet
        </h1>
        <p className="text-stone-600 dark:text-stone-300 mt-4 max-w-xl mx-auto">
          Passez nous voir à l&apos;agence, appelez-nous, ou laissez-nous un message —
          on s&apos;occupe du reste.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Coordonnées */}
        <div className="space-y-9">
          <CoordItem
            label="Adresse"
            icon={
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </>
            }
          >
            <p className="text-stone-700 dark:text-stone-300">{ADRESSE}</p>
          </CoordItem>

          <CoordItem
            label="Horaires"
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
          >
            <p className="text-stone-700 dark:text-stone-300">Du lundi au samedi</p>
            <p className="text-stone-700 dark:text-stone-300">9h – 12h &nbsp;et&nbsp; 14h – 19h</p>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Dimanche fermé</p>
          </CoordItem>

          <CoordItem
            label="Téléphone"
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            }
          >
            {TELEPHONES.map((t) => (
              <a
                key={t.tel}
                href={`tel:${t.tel}`}
                className="block text-stone-700 dark:text-stone-300 hover:text-[color:var(--color-brand)] dark:hover:text-emerald-400 transition-colors"
              >
                {t.affichage}
              </a>
            ))}
          </CoordItem>

          <CoordItem
            label="E-mail"
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            }
          >
            <a
              href={`mailto:${EMAIL}`}
              className="text-stone-700 dark:text-stone-300 hover:text-[color:var(--color-brand)] dark:hover:text-emerald-400 transition-colors break-all"
            >
              {EMAIL}
            </a>
          </CoordItem>

          {/* Carte */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
            <iframe
              src={MAP_SRC}
              title="Plan d'accès — Dussaussois Immobilier & Assurance"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-64 border-0"
            />
          </div>
        </div>

        {/* Formulaire */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            Vous avez le temps&nbsp;? On revient vers vous.
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            Laissez-nous quelques lignes, on vous recontacte au plus vite.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function CoordItem({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[color:var(--color-brand)] dark:text-emerald-400">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-900 dark:text-white mb-1">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
