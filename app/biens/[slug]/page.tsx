import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBienBySlug,
  formatPrix,
  labelType,
  labelTransaction,
} from "@/lib/biens";
import type { Bien } from "@/lib/types";
import ContactForm from "@/app/contact/ContactForm";
import Gallery from "./Gallery";

const STATUT: Record<Bien["statut"], { label: string; className: string }> = {
  disponible: { label: "Disponible", className: "bg-emerald-600 text-white" },
  sous_compromis: { label: "Sous compromis", className: "bg-amber-500 text-white" },
  vendu: { label: "Vendu", className: "bg-stone-500 text-white" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bien = await getBienBySlug(slug);
  if (!bien) return { title: "Bien introuvable" };

  const description =
    bien.description.slice(0, 155).trim() ||
    `${labelType(bien.type)} à ${bien.ville} — ${formatPrix(bien)}.`;

  return {
    title: bien.titre,
    description,
    alternates: { canonical: `/biens/${bien.slug}` },
    openGraph: {
      title: bien.titre,
      description,
      type: "article",
      images: bien.photos.length ? [bien.photos[0]] : undefined,
    },
  };
}

export default async function BienDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bien = await getBienBySlug(slug);
  if (!bien) notFound();

  const statut = STATUT[bien.statut];
  const mapQuery =
    bien.latitude != null && bien.longitude != null
      ? `${bien.latitude},${bien.longitude}`
      : encodeURIComponent(`${bien.ville} ${bien.codePostal}`);

  const caracteristiques: { label: string; value: string }[] = [
    { label: "Type", value: labelType(bien.type) },
    { label: "Transaction", value: labelTransaction(bien.transaction) },
    bien.surface ? { label: "Surface", value: `${bien.surface} m²` } : null,
    bien.pieces ? { label: "Pièces", value: String(bien.pieces) } : null,
    bien.chambres ? { label: "Chambres", value: String(bien.chambres) } : null,
    { label: "Ville", value: `${bien.ville} (${bien.codePostal})` },
    bien.reference ? { label: "Référence", value: bien.reference } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  // Données structurées schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: bien.titre,
    description: bien.description,
    url: `https://dussaussois-immobilier.fr/biens/${bien.slug}`,
    datePosted: bien.dateCreation,
    image: bien.photos,
    ...(bien.prix != null && {
      offers: {
        "@type": "Offer",
        price: bien.prix,
        priceCurrency: "EUR",
      },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: bien.ville,
      postalCode: bien.codePostal,
      addressCountry: "FR",
    },
  };

  const messageParDefaut = `Bonjour,\n\nJe suis intéressé(e) par le bien « ${bien.titre} »${
    bien.reference ? ` (réf. ${bien.reference})` : ""
  }. Pourriez-vous me recontacter ?\n\nMerci.`;

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fil d'ariane */}
      <Link
        href="/biens"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-[color:var(--color-brand)] mb-6"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux biens
      </Link>

      {/* En-tête */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statut.className}`}>
              {statut.label}
            </span>
            <span className="text-sm text-stone-500">
              {bien.ville} ({bien.codePostal})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            {bien.titre}
          </h1>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-[color:var(--color-brand)] dark:text-emerald-400">
          {formatPrix(bien)}
        </p>
      </div>

      <Gallery photos={bien.photos} titre={bien.titre} />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-10">
          {/* Caractéristiques */}
          <section>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Caractéristiques</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200">
              {caracteristiques.map((c) => (
                <div key={c.label} className="bg-white p-4">
                  <dt className="text-xs uppercase tracking-wide text-stone-400">{c.label}</dt>
                  <dd className="mt-1 font-semibold text-stone-900">{c.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Description */}
          {bien.description && (
            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Description</h2>
              <p className="whitespace-pre-line leading-relaxed text-stone-600 dark:text-stone-300">
                {bien.description}
              </p>
            </section>
          )}

          {/* Carte */}
          <section>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Localisation</h2>
            <div className="overflow-hidden rounded-2xl border border-stone-200">
              <iframe
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                title={`Localisation — ${bien.titre}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0"
              />
            </div>
            <p className="mt-2 text-xs text-stone-400">
              Localisation indicative, sur le secteur de {bien.ville}.
            </p>
          </section>
        </div>

        {/* Colonne contact */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900 mb-1">Ce bien vous intéresse&nbsp;?</h2>
            <p className="text-sm text-stone-500 mb-5">
              Laissez-nous un message, on vous recontacte rapidement.
            </p>
            <ContactForm defaultMessage={messageParDefaut} />
          </div>
        </aside>
      </div>
    </article>
  );
}
