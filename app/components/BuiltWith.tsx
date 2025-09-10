import Image from "next/image";

export default function BuiltWith() {
  return (
    <section id="tech" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
      <div className="rounded-3xl border border-black/10 dark:border-white/10 p-6 md:p-10 bg-white/60 dark:bg-white/5">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Tecnología</h3>
            <p className="text-sm text-black/70 dark:text-white/70 mt-1">
              Interfaz moderna con Material UI y toques Aceternity UI.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://mui.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <Image src="/brand-mui.svg" alt="Material UI" width={36} height={36} />
              <span className="text-sm">Material UI</span>
            </a>
            <a href="https://aceternity.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <Image src="/brand-aceternity.svg" alt="Aceternity UI" width={36} height={36} />
              <span className="text-sm">Aceternity UI</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

