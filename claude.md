# Refonte du site — Dussaussois Immobilier

## Contexte
Refonte complète du site d'une agence immobilière locale basée à Abondance
(Haute-Savoie, vallée d'Abondance). L'ancien site est vétuste, daté, et sera
remplacé. Le nouveau doit être nettement plus soigné visuellement, moderne et
mobile-first.

L'agence a deux activités : la **transaction immobilière** (vente, programmes
neufs) et le **courtage en assurance** (vie, auto, santé, habitation, décennale).

## Stack technique
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** pour le style
- Déploiement prévu sur **Vercel**
- **UTF-8 partout** (l'ancien site était en ISO-8859-1, d'où des accents cassés —
  ne jamais reproduire ça)

## Décision d'architecture clé : la couche données des annonces
On ne sait PAS encore d'où viendront les annonces en production. Deux scénarios :
- **Scénario A** : le client utilise un logiciel de transaction (Apimo, Hektor…)
  qui expose un flux/API → on lira ce flux.
- **Scénario B** : pas de logiciel → on construira un back-office (Supabase :
  base + auth + storage photos) pour saisir les biens.

**Donc : ne pas câbler de source de données réelle pour l'instant.** À la place :
- Définir un type `Bien` clair (voir ci-dessous).
- Une fonction `getBiens()` (et `getBienBySlug()`) qui renvoie aujourd'hui des
  **données factices (mock)**.
- Tout le front consomme uniquement cette interface, sans savoir d'où viennent
  les données.
- Le jour où la source est connue, on remplace l'intérieur de `getBiens()` sans
  toucher au reste du site.

### Modèle de données `Bien`
```ts
type StatutBien = "disponible" | "sous_compromis" | "vendu";
type TypeTransaction = "vente" | "location" | "programme_neuf";
type TypeBien =
  | "appartement" | "chalet" | "ferme" | "propriete"
  | "villa" | "bureau_commerce" | "programme_neuf";

interface Bien {
  id: string;
  slug: string;              // pour l'URL : /biens/[slug]
  titre: string;
  transaction: TypeTransaction;
  type: TypeBien;
  statut: StatutBien;
  ville: string;
  codePostal: string;
  prix: number | null;       // null si "Nous consulter" / programme neuf
  surface: number | null;    // m²
  pieces: number | null;
  chambres: number | null;
  description: string;
  photos: string[];          // URLs
  reference: string;         // ex. "Mandat 46"
  dateCreation: string;      // ISO
  latitude?: number;
  longitude?: number;
}
```

## Pages à construire
- **Accueil** : hero photo plein écran, recherche/filtres, biens en avant.
- **Voir nos biens** : liste + filtres (transaction, type, budget, pièces, ville)
  + tri (date, prix croissant/décroissant) + carte interactive.
- **Détail d'un bien** : `/biens/[slug]` — galerie photo, caractéristiques, carte,
  formulaire de contact ; généré en statique avec metadata + schema.org.
- **Qui sommes-nous** : présentation + équipe (photos, parcours).
- **Estimez votre bien** : page soignée + formulaire (générateur de mandats).
- **Courtier en assurance** : section structurée (vie, auto, santé, habitation,
  décennale).
- **Nous rejoindre** (recrutement).
- **Contact** : coordonnées, horaires, formulaire, carte.
- **Mentions légales & CGV**, plan du site.

## Direction artistique
- Vitrine **premium**, pas catalogue. Portée par de **grandes photos** (le cadre
  montagne/vallée d'Abondance est un atout).
- Typographie soignée, beaucoup d'espace blanc, mise en page aérée.
- **Mobile-first** (majorité du trafic immo sur mobile).
- Cartes de biens homogènes : même ratio photo, prix lisible, badge de statut
  (Nouveau / Sous compromis / Vendu).

## SEO (l'ancien site était catastrophique là-dessus)
- Une page statique par annonce, URL propre, `title`/`meta description` remplies.
- Données structurées **schema.org `RealEstateListing`** sur chaque bien.
- Images optimisées via `next/image` (WebP), ratios maîtrisés.
- Préparer le branchement Google Business Profile.

## Formulaires
- Contact, estimation, demande de rappel.
- Envoi mail à brancher plus tard (ex. Resend) + stocker les demandes pour ne
  rien perdre. Pour l'instant, prévoir l'UI et un handler stubbé.

## À NE PAS faire pour l'instant
- Ne pas brancher de vraie source d'annonces (mock uniquement, voir plus haut).
- Ne rien faire qui touche au nom de domaine ou au DNS (géré séparément, en fin
  de projet, le jour du lancement).
- Ne pas coder de logique de paiement : aucune transaction financière dans ce
  projet (« transaction » = activité de vente immobilière, pas de paiement en
  ligne).

## Identité / contenu (à récupérer auprès du client)
- Logo en haute résolution / vectoriel.
- Photos des biens en haute définition.
- Textes existants, coordonnées, horaires.

## Note technique Next.js
@AGENTS.md
