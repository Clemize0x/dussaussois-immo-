"use server";

/**
 * Handler du formulaire de contact.
 *
 * STUB, comme l'estimation et le devis : on valide, on journalise, on renvoie un
 * état pour useActionState. À brancher plus tard : e-mail au propriétaire
 * (Resend) + persistance (Supabase). Voir app/estimation/actions.ts.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
};

type ContactField = "nom" | "email" | "telephone" | "message" | "rgpd";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function envoyerContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const data = {
    nom: (formData.get("nom") as string | null)?.trim() ?? "",
    email: (formData.get("email") as string | null)?.trim() ?? "",
    telephone: (formData.get("telephone") as string | null)?.trim() ?? "",
    message: (formData.get("message") as string | null)?.trim() ?? "",
    rgpd: formData.get("rgpd") === "on",
  };

  const errors: ContactState["errors"] = {};
  if (!data.email) {
    errors.email = "L'e-mail est obligatoire.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Cet e-mail ne semble pas valide.";
  }
  if (!data.message) {
    errors.message = "Merci d'écrire votre message.";
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

  // TODO: sendEmailToOwner(data) + saveDemande("contact", data)
  console.info("[contact] nouveau message", { ...data, recuLe: new Date().toISOString() });

  return {
    status: "success",
    message: "Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.",
  };
}
