import { Suspense } from "react";
import type { Metadata } from "next";
import { getBiens } from "@/lib/biens";
import BiensClient from "./BiensClient";

export const metadata: Metadata = {
  title: "Nos biens — Immobilier dans la vallée d'Abondance",
  description:
    "Consultez toutes nos annonces immobilières : chalets, appartements, fermes à vendre ou louer dans la vallée d'Abondance, Châtel, Saint-Jean-d'Aulps et les Portes du Soleil.",
};

export default async function BiensPage(props: PageProps<"/biens">) {
  const searchParams = await props.searchParams;
  const biens = await getBiens();

  return (
    <Suspense>
      <BiensClient
        biens={biens}
        initialTransaction={(searchParams.transaction as string) ?? ""}
        initialType={(searchParams.type as string) ?? ""}
        initialVille={(searchParams.ville as string) ?? ""}
      />
    </Suspense>
  );
}
