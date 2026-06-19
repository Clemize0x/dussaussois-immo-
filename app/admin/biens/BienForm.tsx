"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Bien } from "@/lib/types";

const inputClass =
  "w-full rounded-md border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 focus:border-[color:var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/20";
const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";

const TRANSACTIONS = [
  { value: "vente", label: "Vente" },
  { value: "location", label: "Location" },
  { value: "programme_neuf", label: "Programme neuf" },
];
const TYPES = [
  { value: "appartement", label: "Appartement" },
  { value: "chalet", label: "Chalet" },
  { value: "ferme", label: "Ferme" },
  { value: "propriete", label: "Propriété" },
  { value: "villa", label: "Villa" },
  { value: "bureau_commerce", label: "Bureau / Commerce" },
  { value: "programme_neuf", label: "Programme neuf" },
];
const STATUTS = [
  { value: "disponible", label: "Disponible" },
  { value: "sous_compromis", label: "Sous compromis" },
  { value: "vendu", label: "Vendu" },
];

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-[color:var(--color-brand)] px-6 py-3 font-semibold text-white hover:bg-[color:var(--color-brand-dark)] disabled:opacity-60"
    >
      {pending ? "Enregistrement…" : label}
    </button>
  );
}

export default function BienForm({
  bien,
  action,
  submitLabel,
}: {
  bien?: Bien;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  const [photos, setPhotos] = useState<string[]>(bien?.photos ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");
    const supabase = createSupabaseBrowserClient();
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from("biens-photos").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("biens-photos").getPublicUrl(path);
        added.push(data.publicUrl);
      }
      setPhotos((prev) => [...prev, ...added]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Échec de l'envoi des photos.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removePhoto(url: string) {
    setPhotos((prev) => prev.filter((p) => p !== url));
  }

  // Glisser-déposer pour réordonner. La photo en position 0 = photo de présentation.
  function handleDrop(target: number) {
    if (dragIndex === null || dragIndex === target) {
      setDragIndex(null);
      return;
    }
    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(target, 0, moved);
      return next;
    });
    setDragIndex(null);
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="photos" value={JSON.stringify(photos)} />

      <div>
        <label htmlFor="titre" className={labelClass}>Titre *</label>
        <input id="titre" name="titre" required defaultValue={bien?.titre} className={inputClass} />
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/5 p-4 cursor-pointer">
        <input
          type="checkbox"
          name="aLaUne"
          defaultChecked={bien?.aLaUne}
          className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[color:var(--color-brand)] focus:ring-[color:var(--color-brand)]/30"
        />
        <span className="text-sm">
          <span className="font-medium text-stone-900">Bien du moment</span>
          <span className="block text-stone-500">
            Affiche ce bien dans la section « Nos biens du moment » de la page d&apos;accueil.
          </span>
        </span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="transaction" className={labelClass}>Transaction</label>
          <select id="transaction" name="transaction" defaultValue={bien?.transaction ?? "vente"} className={inputClass}>
            {TRANSACTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>Type de bien</label>
          <select id="type" name="type" defaultValue={bien?.type ?? "appartement"} className={inputClass}>
            {TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="statut" className={labelClass}>Statut</label>
          <select id="statut" name="statut" defaultValue={bien?.statut ?? "disponible"} className={inputClass}>
            {STATUTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ville" className={labelClass}>Ville</label>
          <input id="ville" name="ville" defaultValue={bien?.ville} className={inputClass} />
        </div>
        <div>
          <label htmlFor="codePostal" className={labelClass}>Code postal</label>
          <input id="codePostal" name="codePostal" defaultValue={bien?.codePostal} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <div>
          <label htmlFor="prix" className={labelClass}>Prix (€)</label>
          <input id="prix" name="prix" type="number" inputMode="numeric" defaultValue={bien?.prix ?? ""} placeholder="vide = Nous consulter" className={inputClass} />
        </div>
        <div>
          <label htmlFor="surface" className={labelClass}>Surface (m²)</label>
          <input id="surface" name="surface" type="number" inputMode="numeric" defaultValue={bien?.surface ?? ""} className={inputClass} />
        </div>
        <div>
          <label htmlFor="pieces" className={labelClass}>Pièces</label>
          <input id="pieces" name="pieces" type="number" inputMode="numeric" defaultValue={bien?.pieces ?? ""} className={inputClass} />
        </div>
        <div>
          <label htmlFor="chambres" className={labelClass}>Chambres</label>
          <input id="chambres" name="chambres" type="number" inputMode="numeric" defaultValue={bien?.chambres ?? ""} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows={6} defaultValue={bien?.description} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="reference" className={labelClass}>Référence</label>
          <input id="reference" name="reference" defaultValue={bien?.reference} placeholder="Ex. Mandat 46" className={inputClass} />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>Slug (URL)</label>
          <input id="slug" name="slug" defaultValue={bien?.slug} placeholder="auto depuis le titre si vide" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="latitude" className={labelClass}>Latitude (option.)</label>
          <input id="latitude" name="latitude" defaultValue={bien?.latitude ?? ""} className={inputClass} />
        </div>
        <div>
          <label htmlFor="longitude" className={labelClass}>Longitude (option.)</label>
          <input id="longitude" name="longitude" defaultValue={bien?.longitude ?? ""} className={inputClass} />
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className={labelClass}>Photos</label>
        <p className="-mt-1 mb-3 text-sm text-stone-500">
          Glissez-déposez les vignettes pour les réordonner.{" "}
          <span className="font-medium text-stone-700">
            La première photo est la photo de présentation
          </span>{" "}
          : c&apos;est elle qui s&apos;affiche en premier sur le site.
        </p>

        {/* Champ fichier masqué, déclenché par les boutons d'ajout */}
        <input
          id="photos-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="sr-only"
        />

        {photos.length === 0 ? (
          // Aucune photo : grande zone d'ajout
          <label
            htmlFor="photos-upload"
            className="flex aspect-[16/7] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-stone-500 hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Ajouter des photos</span>
          </label>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {photos.map((url, i) => (
              <div
                key={url}
                draggable
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => setDragIndex(null)}
                className={`group relative aspect-[4/3] cursor-grab overflow-hidden rounded-lg border active:cursor-grabbing ${
                  i === 0 ? "border-[color:var(--color-brand)]" : "border-stone-200"
                } ${dragIndex === i ? "opacity-40" : ""}`}
              >
                <Image src={url} alt="" fill className="object-cover pointer-events-none" sizes="25vw" />

                {/* Badge photo de présentation sur la première */}
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 rounded bg-[color:var(--color-brand)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Présentation
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removePhoto(url)}
                  className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                  aria-label="Retirer la photo"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Pastille "+" pour ajouter à la suite */}
            <label
              htmlFor="photos-upload"
              className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-stone-300 text-stone-400 hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs font-medium">Ajouter</span>
            </label>
          </div>
        )}

        {uploading && <p className="mt-2 text-sm text-stone-500">Envoi des photos…</p>}
        {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <SubmitButton label={submitLabel} />
        <a href="/admin" className="text-sm text-stone-500 hover:text-stone-900">Annuler</a>
      </div>
    </form>
  );
}
