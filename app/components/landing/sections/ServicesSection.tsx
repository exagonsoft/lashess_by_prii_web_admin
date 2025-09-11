import ServiceCard from "@/app/components/ServiceCard";
import SectionWrapper from "@/app/components/landing/SectionWrapper";
import { IService } from "@/lib/interfaces/types";
import { Key } from "react";

async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/services`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}

export default async function Services() {
  const services = await getServices();

  return (
    <SectionWrapper id="services">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-semibold">Servicios destacados</h2>
        <a href="#booking" className="text-pink-500 hover:text-pink-600">
          Reservar ahora →
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.length > 0 ? (
          services.map((s: IService, indx: Key | null | undefined) => (
            <ServiceCard
              key={indx}
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
