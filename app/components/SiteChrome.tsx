"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Affiche l'en-tête et le pied de page du site public partout SAUF dans
 * l'espace d'administration (/admin), qui a sa propre interface.
 */
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Footer />;
}
