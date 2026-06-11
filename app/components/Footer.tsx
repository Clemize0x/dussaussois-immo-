import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-brand)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Agence */}
          <div className="lg:col-span-2">
            <p className="font-bold text-xl mb-1 tracking-tight">
              Dussaussois Immobilier
            </p>
            <p className="text-emerald-200 text-sm mb-4">
              Votre agence immobilière dans la vallée d'Abondance
            </p>
            <address className="not-italic text-sm text-emerald-100 space-y-1">
              <p>Abondance — Haute-Savoie (74360)</p>
              <p>
                <a
                  href="tel:+33450000000"
                  className="hover:text-white transition-colors"
                >
                  04 50 00 00 00
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@dussaussois-immobilier.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@dussaussois-immobilier.fr
                </a>
              </p>
            </address>
          </div>

          {/* Liens rapides */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest text-emerald-300 mb-3">
              Immobilier
            </p>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><Link href="/biens" className="hover:text-white transition-colors">Nos biens</Link></li>
              <li><Link href="/estimation" className="hover:text-white transition-colors">Estimer mon bien</Link></li>
              <li><Link href="/qui-sommes-nous" className="hover:text-white transition-colors">Qui sommes-nous</Link></li>
              <li><Link href="/nous-rejoindre" className="hover:text-white transition-colors">Nous rejoindre</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest text-emerald-300 mb-3">
              Services
            </p>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><Link href="/assurances" className="hover:text-white transition-colors">Courtier en assurance</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/plan-du-site" className="hover:text-white transition-colors">Plan du site</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-400">
          <p>
            &copy; {new Date().getFullYear()} Dussaussois Immobilier — Tous droits réservés
          </p>
          <p>
            Carte professionnelle T n° XXXX — Garantie Financière : XXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
