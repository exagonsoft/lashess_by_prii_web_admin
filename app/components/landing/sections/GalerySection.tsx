import Image from "next/image";
import SectionWrapper from "@/app/components/landing/SectionWrapper";

export default function Gallery() {
  return (
    <SectionWrapper id="gallery">
      <h2 className="text-2xl md:text-3xl font-semibold">Galería</h2>
      <p className="text-black/70 dark:text-white/70 mt-2">
        Antes y después, estilos y resultados reales.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
            <Image src="/lash-illustration.svg" alt="Galería" fill className="object-cover" />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
