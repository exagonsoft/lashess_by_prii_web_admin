import Image from "next/image";
import React from "react";

const AppSection = () => {
  return (
    <section id="app" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
      <div className="grid md:grid-cols-2 gap-10 items-center rounded-3xl border border-black/10 dark:border-white/10 p-6 md:p-10 bg-gradient-to-br from-pink-50 to-white dark:from-pink-500/10 dark:to-white/5">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Nuestra App</h2>
          <p className="text-black/70 dark:text-white/70 mt-2">
            Reserva, reprograma y recibe recordatorios. Guarda tus estilos
            favoritos y paga desde el móvil.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a href="#" aria-label="Descargar en App Store">
              <Image
                src="/badge-appstore.svg"
                alt="App Store"
                width={160}
                height={52}
              />
            </a>
            <a href="#" aria-label="Descargar en Google Play">
              <Image
                src="/badge-googleplay.svg"
                alt="Google Play"
                width={180}
                height={52}
              />
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative mx-auto h-[420px] w-[220px] md:h-[520px] md:w-[270px]">
            <Image
              src="/phone-mock.svg"
              alt="App preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
