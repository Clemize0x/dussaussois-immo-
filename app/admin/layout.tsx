import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          <p className="font-semibold mb-1">Back-office pas encore activé</p>
          <p>
            Renseignez les clés Supabase (fichier <code>.env.local</code>) puis
            redémarrez le serveur pour accéder à l&apos;espace de gestion.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {user && (
        <header className="bg-white border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/admin" className="font-bold text-[color:var(--color-brand)]">
              Dussaussois · Gestion
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-stone-500">{user.email}</span>
              <Link href="/" className="text-sm text-stone-500 hover:text-stone-900">
                Voir le site
              </Link>
              <form action={signOut}>
                <button className="text-sm font-medium text-stone-700 hover:text-red-600">
                  Se déconnecter
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
