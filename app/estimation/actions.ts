"use server";

/**
 * Handler du formulaire d'estimation.
 *
 * STUB pour l'instant : on valide, on journalise la demande côté serveur, et on
 * renvoie un état exploitable par le formulaire (useActionState).
 *
 * À brancher plus tard :
 *   - Envoi d'un e-mail au propriétaire de l'agence (ex. Resend).
 *   - Persistance de la demande pour ne rien perdre (ex. Supabase),
 *     indépendamment de l'e-mail.
 * Tant que ce n'est pas branché, AUCUNE demande ne doit être considérée comme
 * reçue par le client : le message de succès reflète seulement l'enregistrement.
 */

export type EstimationState = {
  status: "idle" | "success" | "error";
  message: string;
  // Erreurs par champ, pour réafficher sous l'input concerné.
  errors?: Partial<Record<EstimationField, string>>;
};

type EstimationField =
  | "email"
  | "telephone"
  | "typeBien"
  | "surface"
  | "codePostal"
  | "ville"
  | "adresse"
  | "rgpd";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function envoyerEstimation(
  _prevState: EstimationState,
  formData: FormData,
): Promise<EstimationState> {
  const data = {
    email: (formData.get("email") as string | null)?.trim() ?? "",
    telephone: (formData.get("telephone") as string | null)?.trim() ?? "",
    typeBien: (formData.get("typeBien") as string | null)?.trim() ?? "",
    surface: (formData.get("surface") as string | null)?.trim() ?? "",
    codePostal: (formData.get("codePostal") as string | null)?.trim() ?? "",
    ville: (formData.get("ville") as string | null)?.trim() ?? "",
    adresse: (formData.get("adresse") as string | null)?.trim() ?? "",
    rgpd: formData.get("rgpd") === "on",
  };

  // --- Validation serveur (ne jamais faire confiance au seul HTML) ----------
  const errors: EstimationState["errors"] = {};
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

  // --- TODO: envoi e-mail + persistance -------------------------------------
  // await sendEmailToOwner(data);   // ex. Resend
  // await saveDemande("estimation", data);  // ex. Supabase
  // En attendant, on journalise pour ne rien perdre pendant le développement.
  console.info("[estimation] nouvelle demande", {
    ...data,
    recuLe: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Merci, votre demande d'estimation a bien été enregistrée. Nous vous recontactons très vite.",
  };
}
