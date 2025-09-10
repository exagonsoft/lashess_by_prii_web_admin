import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BuiltWith from "./components/BuiltWith";
import { Spotlight } from "./components/ui/Spotlight";
import CTAButtons from "./components/CTAButtons";
import ServiceCard from "./components/ServiceCard";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import ShinyText from "./components/ui/ShinyText";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-pattern.svg"
            alt=""
            fill
            priority
            className="object-cover opacity-20 dark:opacity-30"
          />
        </div>
        <Spotlight />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-xs md:text-sm text-black/70 dark:text-white/70">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Estudio boutique en tu ciudad
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl/tight font-semibold">
              Eleva tu mirada con <ShinyText>Lashess By Prii</ShinyText>
            </h1>
            <p className="mt-4 text-black/70 dark:text-white/70 max-w-2xl">
              Extensiones de pestañas, lifting y diseño de cejas con artistas certificados.
              Reserva en segundos desde nuestra app móvil.
            </p>
            <CTAButtons />
            <div className="mt-8 flex items-center gap-6 text-sm text-black/70 dark:text-white/70">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Garantía de higiene
              </div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20l9-5-9-5-9 5 9 5z" />
                </svg>
                Artistas certificados
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto h-[520px] w-full flex justify-center md:justify-end">
              <Image src="/phone-mock.svg" alt="Mobile app preview" fill priority className="!w-auto !right-0 !relative" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-semibold">Servicios destacados</h2>
          <a href="#booking" className="text-pink-500 hover:text-pink-600">Reservar ahora →</a>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Clásicas", price: "$45" },
            { name: "Híbridas", price: "$60" },
            { name: "Volumen", price: "$75" },
            { name: "Lifting de pestañas", price: "$40" },
            { name: "Perfilado de cejas", price: "$30" },
            { name: "Mantenimiento", price: "$35" },
          ].map((s) => (
            <ServiceCard key={s.name} name={s.name} price={s.price} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Galería</h2>
        <p className="text-black/70 dark:text-white/70 mt-2">Antes y después, estilos y resultados reales.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/lash-illustration.svg" alt="Galería" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Opiniones</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "María",
              text:
                "¡Encantada! Las pestañas se ven súper naturales y el estudio es impecable.",
            },
            {
              name: "Sofía",
              text: "Reservé desde la app en 1 minuto. Atención excelente y resultados perfectos.",
            },
            {
              name: "Camila",
              text: "Mi lugar favorito. Siempre salgo feliz y con la mirada renovada.",
            },
          ].map((r) => (
            <figure
              key={r.name}
              className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-pink-200 dark:bg-pink-500/30" />
                <figcaption className="font-medium">{r.name}</figcaption>
              </div>
              <blockquote className="text-sm text-black/70 dark:text-white/70 mt-3">“{r.text}”</blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* App CTA */}
      <section id="app" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center rounded-3xl border border-black/10 dark:border-white/10 p-6 md:p-10 bg-gradient-to-br from-pink-50 to-white dark:from-pink-500/10 dark:to-white/5">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Nuestra App</h2>
            <p className="text-black/70 dark:text-white/70 mt-2">
              Reserva, reprograma y recibe recordatorios. Guarda tus estilos favoritos
              y paga desde el móvil.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a href="#" aria-label="Descargar en App Store">
                <Image src="/badge-appstore.svg" alt="App Store" width={160} height={52} />
              </a>
              <a href="#" aria-label="Descargar en Google Play">
                <Image src="/badge-googleplay.svg" alt="Google Play" width={180} height={52} />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto h-[420px] w-[220px] md:h-[520px] md:w-[270px]">
              <Image src="/phone-mock.svg" alt="App preview" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      <BuiltWith />
      <Footer />
    </div>
  );
}
