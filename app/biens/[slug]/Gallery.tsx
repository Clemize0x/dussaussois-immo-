"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ photos, titre }: { photos: string[]; titre: string }) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-stone-100 text-stone-300">
        <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={photos[active]}
          alt={`${titre} — photo ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
          {photos.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                i === active
                  ? "border-[color:var(--color-brand)]"
                  : "border-transparent hover:border-stone-300"
              }`}
              aria-label={`Voir la photo ${i + 1}`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
