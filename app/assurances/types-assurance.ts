// Liste partagée des assurances proposées.
// Module neutre (pas "use client") pour être importable côté serveur ET client.

export const TYPES_ASSURANCE = [
  { value: "vie", label: "Assurance Vie" },
  { value: "auto", label: "Assurance Auto" },
  { value: "sante", label: "Assurance Santé" },
  { value: "habitation", label: "Assurance Habitation" },
  { value: "decennale", label: "Assurance Décennale" },
];
