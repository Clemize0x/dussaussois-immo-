"use server";

/**
 * Handler du formulaire de devis assurance.
 *
 * STUB, comme le formulaire d'estimation : on valide, on journalise, on renvoie
 * un état pour useActionState. À brancher plus tard : e-mail au propriétaire
 * (Resend) + persistance de la demande (Supabase). Voir app/estimation/actions.ts.
 */

export type DevisState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<DevisField, string>>;
};

type DevisField = "typeAssurance" | "nom" | "email" | "telephone" | "message" | "rgpd";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function envoyerDevis(
  _prevState: DevisState,
  formData: FormData,
): Promise<DevisState> {
  const data = {
    typeAssurance: (formData.get("typeAssurance") as string | null)?.trim() ?? "",
    nom: (formData.get("nom") as string | null)?.trim() ?? "",
    email: (formData.get("email") as string | null)?.trim() ?? "",
    telephone: (formData.get("telephone") as string | null)?.trim() ?? "",
    message: (formData.get("message") as string | null)?.trim() ?? "",
    rgpd: formData.get("rgpd") === "on",
  };

  const errors: DevisState["errors"] = {};
  if (!data.typeAssurance) {
    errors.typeAssurance = "Choisissez l'assurance qui vous intéresse.";
  }
  if (!data.email) {
    errors.email = "L'e-mail est obligatoire.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Cet e-mail ne semble pas valide.";
  }
  if (!data.rgpd) {
    errors.rgpd = "Merci d'accepter le traitement de vos données pour continuer.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Veuillez corriger les champs signalés.",
      errors,
    };
  }

  // TODO: sendEmailToOwner(data) + saveDemande("devis", data)
  console.info("[devis] nouvelle demande", { ...data, recuLe: new Date().toISOString() });

  return {
    status: "success",
    message:
      "Merci, votre demande de devis a bien été enregistrée. Nous revenons vers vous sous 24 h ouvrées avec une proposition personnalisée.",
  };
}
