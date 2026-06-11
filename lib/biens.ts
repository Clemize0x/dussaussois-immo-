/**
 * Couche données des annonces — version mock.
 *
 * Toute la logique du site consomme uniquement getBiens() et getBienBySlug().
 * Quand la source réelle sera connue (Apimo/Hektor ou Supabase), on remplace
 * l'intérieur de ces deux fonctions sans toucher au reste du site.
 */

import { Bien } from "./types";

// ---------------------------------------------------------------------------
// Données factices — vallée d'Abondance, Haute-Savoie
// ---------------------------------------------------------------------------

const BIENS_MOCK: Bien[] = [
  {
    id: "1",
    slug: "chalet-5-pieces-abondance-vue-montagne",
    titre: "Chalet 5 pièces — Vue montagne & pâturages",
    transaction: "vente",
    type: "chalet",
    statut: "disponible",
    ville: "Abondance",
    codePostal: "74360",
    prix: 485000,
    surface: 138,
    pieces: 5,
    chambres: 3,
    description:
      "Magnifique chalet traditionnel savoyard situé à flanc de coteau, offrant une vue imprenable sur les pâturages et les sommets environnants. Construction typique en bois et pierre, entièrement rénovée avec des matériaux de qualité. Au rez-de-chaussée : grande pièce de vie ouverte avec cheminée, cuisine équipée, cellier. À l'étage : 3 chambres dont une suite parentale, salle de bains et salle d'eau. Chalet sur sous-sol complet avec garage double. Jardin arboré de 800 m², terrasse plein sud.",
    photos: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 142",
    dateCreation: "2026-05-10T08:00:00Z",
    latitude: 46.2764,
    longitude: 6.7361,
  },
  {
    id: "2",
    slug: "appartement-3-pieces-chatel-pied-des-pistes",
    titre: "Appartement 3 pièces — Pied des pistes",
    transaction: "vente",
    type: "appartement",
    statut: "disponible",
    ville: "Châtel",
    codePostal: "74390",
    prix: 298000,
    surface: 62,
    pieces: 3,
    chambres: 2,
    description:
      "Bel appartement au pied des pistes du domaine des Portes du Soleil. Exposition plein sud, séjour lumineux avec accès balcon, cuisine américaine équipée, 2 chambres, salle de bains. Cave et place de parking extérieure incluses. Résidence récente avec gestionnaire sur place. Idéal résidence secondaire ou investissement locatif saisonnier.",
    photos: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 138",
    dateCreation: "2026-04-22T09:30:00Z",
    latitude: 46.2695,
    longitude: 6.8391,
  },
  {
    id: "3",
    slug: "ferme-renovee-chapelle-abondance",
    titre: "Ferme rénovée — Cachet authentique & grand terrain",
    transaction: "vente",
    type: "ferme",
    statut: "disponible",
    ville: "La Chapelle-d'Abondance",
    codePostal: "74360",
    prix: 625000,
    surface: 210,
    pieces: 7,
    chambres: 5,
    description:
      "Ancienne ferme savoyarde du XVIIIe siècle entièrement réhabilitée dans le respect du bâti traditionnel. Grande salle de vie avec poutres apparentes et poêle à bois, cuisine ouverte, 5 chambres dont 2 suites, 3 salles d'eau. Dépendance aménageable (atelier ou bureau). Terrain de 2 500 m² avec potager, verger et panorama sur les alpages. Travaux de grande qualité.",
    photos: [
      "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 135",
    dateCreation: "2026-03-15T10:00:00Z",
    latitude: 46.2556,
    longitude: 6.7913,
  },
  {
    id: "4",
    slug: "chalet-luxe-7-pieces-chatel-domaine-skiable",
    titre: "Chalet de luxe 7 pièces — Domaine skiable",
    transaction: "vente",
    type: "chalet",
    statut: "disponible",
    ville: "Châtel",
    codePostal: "74390",
    prix: 895000,
    surface: 265,
    pieces: 7,
    chambres: 5,
    description:
      "Exceptionnel chalet contemporain alliant tradition savoyarde et confort haut de gamme. Situation privilégiée à 5 minutes à pied des remontées mécaniques. Grand salon-séjour avec mezzanine et cheminée centrale, cuisine professionnelle, 5 chambres en suite, salle de sport, sauna, cinéma maison. Terrasse de 80 m² avec jacuzzi extérieur. Garage 3 voitures. Prestations premiums.",
    photos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 131",
    dateCreation: "2026-02-01T11:00:00Z",
    latitude: 46.2695,
    longitude: 6.8391,
  },
  {
    id: "5",
    slug: "appartement-2-pieces-abondance-centre",
    titre: "Appartement 2 pièces — Centre d'Abondance",
    transaction: "vente",
    type: "appartement",
    statut: "sous_compromis",
    ville: "Abondance",
    codePostal: "74360",
    prix: 178000,
    surface: 38,
    pieces: 2,
    chambres: 1,
    description:
      "Appartement de type T2 en plein cœur du village. Séjour avec coin cuisine, 1 chambre, salle d'eau et WC. Cave privative. À deux pas des commerces, de l'abbaye et des départs de randonnées. Idéal premier achat ou investissement.",
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 129",
    dateCreation: "2026-01-20T14:00:00Z",
    latitude: 46.2764,
    longitude: 6.7361,
  },
  {
    id: "6",
    slug: "chalet-4-pieces-saint-jean-aulps",
    titre: "Chalet 4 pièces — Calme & nature",
    transaction: "vente",
    type: "chalet",
    statut: "disponible",
    ville: "Saint-Jean-d'Aulps",
    codePostal: "74430",
    prix: 398000,
    surface: 108,
    pieces: 4,
    chambres: 3,
    description:
      "Joli chalet en bout de route dans un hameau calme, idéalement exposé plein sud. Séjour avec terrasse ouverte sur la vallée, cuisine indépendante, 3 chambres, salle de bains. Sous-sol : buanderie et rangements. Jardin plat de 600 m², proche des pistes de ski de fond et des sentiers de randonnée.",
    photos: [
      "https://images.unsplash.com/photo-1469521752669-9f782e43f408?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 127",
    dateCreation: "2026-05-28T08:00:00Z",
    latitude: 46.2279,
    longitude: 6.7344,
  },
  {
    id: "7",
    slug: "appartement-4-pieces-chatel-location",
    titre: "Appartement 4 pièces — Location annuelle",
    transaction: "location",
    type: "appartement",
    statut: "disponible",
    ville: "Châtel",
    codePostal: "74390",
    prix: 1250,
    surface: 82,
    pieces: 4,
    chambres: 2,
    description:
      "Grand appartement en location annuelle à Châtel. Séjour, cuisine séparée, 2 chambres, bureau, salle de bains et WC séparés. Balcon plein sud avec vue sur le village. Cave et parking. Disponible à partir du 1er septembre. Loyer 1 250 €/mois hors charges.",
    photos: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 144",
    dateCreation: "2026-06-01T09:00:00Z",
    latitude: 46.2695,
    longitude: 6.8391,
  },
  {
    id: "8",
    slug: "ferme-renover-bonnevaux",
    titre: "Ferme à rénover — Beau potentiel",
    transaction: "vente",
    type: "ferme",
    statut: "disponible",
    ville: "Bonnevaux",
    codePostal: "74360",
    prix: 248000,
    surface: 180,
    pieces: 6,
    chambres: 4,
    description:
      "Belle ferme ancienne à rénover entièrement, offrant un potentiel exceptionnel. Volumes généreux (180 m² habitables + grange attenante de 120 m²), belle charpente, vue dégagée sur les montagnes. Terrain de 3 000 m². Idéale pour projet familial ou hébergement touristique. Prix incluant l'ensemble bâti.",
    photos: [
      "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 119",
    dateCreation: "2025-11-10T10:00:00Z",
    latitude: 46.2918,
    longitude: 6.7523,
  },
  {
    id: "9",
    slug: "chalet-vue-lac-thonon-les-bains",
    titre: "Chalet 6 pièces — Vue lac Léman",
    transaction: "vente",
    type: "chalet",
    statut: "disponible",
    ville: "Thonon-les-Bains",
    codePostal: "74200",
    prix: 760000,
    surface: 195,
    pieces: 6,
    chambres: 4,
    description:
      "Superbe chalet contemporain avec vue panoramique sur le lac Léman et les Alpes suisses. Grand salon double séjour baigné de lumière, cuisine ouverte haut de gamme, 4 chambres en suite, grande terrasse de 100 m² orientée sud-ouest. Piscine couverte, jacuzzi, cave à vin, garage 2 places. À 10 minutes du centre de Thonon.",
    photos: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Mandat 122",
    dateCreation: "2025-12-05T09:00:00Z",
    latitude: 46.371,
    longitude: 6.4783,
  },
  {
    id: "10",
    slug: "programme-neuf-residence-chalets-abondance",
    titre: "Programme neuf — Résidence Les Chalets d'Abondance",
    transaction: "programme_neuf",
    type: "programme_neuf",
    statut: "disponible",
    ville: "Abondance",
    codePostal: "74360",
    prix: null,
    surface: null,
    pieces: null,
    chambres: null,
    description:
      "Nouveau programme immobilier au cœur d'Abondance : 12 appartements (du T2 au T4) et 4 chalets individuels, livrés fin 2027. Architecture contemporaine respectueuse du patrimoine montagnard, prestations haut de gamme, balcons et terrasses pour chaque logement. Dispositif Pinel disponible sur les appartements. Contactez-nous pour le catalogue de vente et les prix.",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    reference: "Programme 01",
    dateCreation: "2026-06-05T08:00:00Z",
    latitude: 46.2764,
    longitude: 6.7361,
  },
];

// ---------------------------------------------------------------------------
// API interne — à remplacer le jour J sans toucher au reste du site
// ---------------------------------------------------------------------------

export async function getBiens(): Promise<Bien[]> {
  // Simulation d'un appel asynchrone (API, BDD…)
  return BIENS_MOCK;
}

export async function getBienBySlug(slug: string): Promise<Bien | null> {
  return BIENS_MOCK.find((b) => b.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Utilitaires de présentation (non liés à la source de données)
// ---------------------------------------------------------------------------

export function formatPrix(bien: Bien): string {
  if (bien.prix === null) return "Nous consulter";
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(bien.prix);
  return bien.transaction === "location" ? `${formatted} / mois` : formatted;
}

export function labelTransaction(t: Bien["transaction"]): string {
  return { vente: "Vente", location: "Location", programme_neuf: "Programme neuf" }[t];
}

export function labelType(t: Bien["type"]): string {
  return {
    appartement: "Appartement",
    chalet: "Chalet",
    ferme: "Ferme",
    propriete: "Propriété",
    villa: "Villa",
    bureau_commerce: "Bureau / Commerce",
    programme_neuf: "Programme neuf",
  }[t];
}

export function isNouveau(bien: Bien, joursMax = 30): boolean {
  const delta = Date.now() - new Date(bien.dateCreation).getTime();
  return delta < joursMax * 24 * 60 * 60 * 1000;
}
