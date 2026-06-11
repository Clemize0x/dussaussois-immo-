"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/biens", label: "Nos biens" },
  { href: "/estimation", label: "Estimer mon bien" },
  { href: "/assurances", label: "Assurances" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nom */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[color:var(--color-brand)] font-bold text-lg tracking-tight">
              Dussaussois
            </span>
            <span className="hidden sm:inline text-stone-400 font-light text-lg">
              Immobilier
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-[color:var(--color-brand)] text-white"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+33450000000"
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              04 50 00 00 00
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-md text-sm font-semibold bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-dark)] transition-colors"
            >
              Nous contacter
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-[color:var(--color-brand)] text-white"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+33450000000"
              className="px-3 py-2 text-sm text-stone-500"
            >
              04 50 00 00 00
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
