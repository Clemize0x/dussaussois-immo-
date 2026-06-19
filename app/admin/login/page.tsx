import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Espace pro",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-[color:var(--color-brand)] font-bold text-lg">Dussaussois</p>
          <p className="text-stone-500 text-sm">Espace de gestion</p>
        </div>

        {isSupabaseConfigured() ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <LoginForm />
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
            <p className="font-semibold mb-1">Back-office pas encore activé</p>
            <p>
              Les clés Supabase ne sont pas renseignées. Une fois le projet
              Supabase créé et les variables d&apos;environnement remplies, la
              connexion sera disponible ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
