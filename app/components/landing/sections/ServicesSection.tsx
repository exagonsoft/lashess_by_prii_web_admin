"use client";
import { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ServiceCard";
import SectionWrapper from "@/app/components/landing/SectionWrapper";
import { IService } from "@/lib/interfaces/types";

export default function Services() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/v1/public/services`
        );
        if (!res.ok) throw new Error("Error cargando servicios");
        const data = await res.json();
        setServices(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
        setError("No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <SectionWrapper id="services">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-semibold">Servicios destacados</h2>
        <a href="#booking" className="text-pink-500 hover:text-pink-600">
          Reservar ahora →
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {loading ? (
          <p className="text-black/60 dark:text-white/60">Cargando servicios...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : services.length > 0 ? (
          services.map((s: IService) => (
            <ServiceCard
              key={s.id || s.name}
              name={s.name}
              price={s.price}
              image={s.imageUrl}
            />
          ))
        ) : (
          <p className="text-black/60 dark:text-white/60">
            No hay servicios disponibles en este momento.
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
