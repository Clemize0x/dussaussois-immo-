"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "../actions";

const initialState: AuthState = { error: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[color:var(--color-brand)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-brand-dark)] disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
