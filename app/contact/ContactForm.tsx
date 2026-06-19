"use client";

import { useActionState } from "react";
import { envoyerContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20 transition-colors";
const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

export default function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [state, formAction, pending] = useActionState(envoyerContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-stone-900 mb-2">Message envoyé</h3>
        <p className="text-stone-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && (
        <p
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="nom" className={labelClass}>
          Nom &amp; prénom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          placeholder="Prénom Nom"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Votre e-mail <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.fr"
            aria-invalid={Boolean(state.errors?.email)}
            className={inputClass}
          />
          {state.errors?.email && (
            <p className="mt-1.5 text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="telephone" className={labelClass}>
            Votre téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Votre message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={defaultMessage}
          placeholder="Dites-nous tout…"
          aria-invalid={Boolean(state.errors?.message)}
          className={inputClass}
        />
        {state.errors?.message && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="rgpd"
            required
            aria-invalid={Boolean(state.errors?.rgpd)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-stone-300 text-[color:var(--color-brand)] focus:ring-[color:var(--color-brand)]/30"
          />
          <span className="text-sm leading-relaxed text-stone-600">
            Conformément au RGPD, j&apos;accepte que ces informations soient
            utilisées par Dussaussois Immobilier &amp; Assurance dans le seul but de
            répondre à ma demande. Elles ne sont jamais cédées à des tiers.
          </span>
        </label>
        {state.errors?.rgpd && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.rgpd}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[color:var(--color-brand)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[color:var(--color-brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Envoi en cours…" : "Envoyer mon message"}
      </button>
    </form>
  );
}
