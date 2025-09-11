import Image from "next/image";
import React from "react";
import { Spotlight } from "@/app/components/ui/Spotlight";
import ShinyText from "@/app/components/ui/ShinyText";
import CTAButtons from "@/app/components/CTAButtons";
import SectionWrapper from "@/app/components/landing/SectionWrapper";

const HeroSection = () => {
  return (
    <SectionWrapper id="hero" className="relative overflow-hidden">
      
      <Spotlight />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-xs md:text-sm text-black/70 dark:text-white/70">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Estudio boutique en tu ciudad
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl/tight font-semibold">
            Eleva tu mirada con <ShinyText>Lashess By Prii</ShinyText>
          </h1>
          <p className="mt-4 text-black/70 dark:text-white/70 max-w-2xl">
            Extensiones de pestañas, lifting y diseño de cejas con artistas
            certificados. Reserva en segundos desde nuestra app móvil.
          </p>
          <CTAButtons />
          <div className="mt-8 flex items-center gap-6 text-sm text-black/70 dark:text-white/70">
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Garantía de higiene
            </div>
            <div className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20l9-5-9-5-9 5 9 5z" />
              </svg>
              Artistas certificados
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto h-[520px] w-full flex justify-center md:justify-end">
            <Image
              src="/phone-mock.svg"
              alt="Mobile app preview"
              fill
              priority
              className="!w-auto !right-0 !relative"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
