"use client";
import Image from "next/image";
import SectionWrapper from "@/app/components/landing/SectionWrapper";
import { IGallery } from "@/lib/interfaces/types";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [gallery, setGaleries] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGaleryImages() {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/public/galery`);
        if (!res.ok) throw new Error("Error cargando imagenes de galería");
        const data = await res.json();
        setGaleries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
        setError("No se pudieron cargar las imagenes.");
      } finally {
        setLoading(false);
      }
    }
    fetchGaleryImages();
  }, []);
  return (
    <SectionWrapper id="gallery">
      <h2 className="text-2xl md:text-3xl font-semibold">Galería</h2>
      <p className="text-black/70 dark:text-white/70 mt-2">
        Antes y después, estilos y resultados reales.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-black/60 dark:text-white/60">
            Cargando servicios...
          </p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : gallery.length > 0 ? (
          gallery.map((s: IGallery) => (
            <div
              key={s._id}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={s.imageUrl}
                alt="Galería"
                fill
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-black/60 dark:text-white/60">
            No hay imagenes disponibles en la galeria.
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
