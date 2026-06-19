import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "./components/SiteChrome";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dussaussois Immobilier — Agence immobilière à Abondance",
    template: "%s | Dussaussois Immobilier",
  },
  description:
    "Agence immobilière et courtier en assurance basée à Abondance (Haute-Savoie). Vente, location, programmes neufs dans la vallée d'Abondance et les Portes du Soleil.",
  metadataBase: new URL("https://dussaussois-immobilier.fr"),
  openGraph: {
    siteName: "Dussaussois Immobilier",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-stone-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
