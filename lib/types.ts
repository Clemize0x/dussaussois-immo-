export type StatutBien = "disponible" | "sous_compromis" | "vendu";
export type TypeTransaction = "vente" | "location" | "programme_neuf";
export type TypeBien =
  | "appartement"
  | "chalet"
  | "ferme"
  | "propriete"
  | "villa"
  | "bureau_commerce"
  | "programme_neuf";

export interface Bien {
  id: string;
  slug: string;
  titre: string;
  transaction: TypeTransaction;
  type: TypeBien;
  statut: StatutBien;
  ville: string;
  codePostal: string;
  prix: number | null; // null = "Nous consulter" ou programme neuf
  surface: number | null; // m²
  pieces: number | null;
  chambres: number | null;
  description: string;
  photos: string[]; // URLs
  reference: string; // ex. "Mandat 46"
  dateCreation: string; // ISO 8601
  latitude?: number;
  longitude?: number;
}
