import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-black/10 dark:border-white/10 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Lashess By Prii</h3>
          <p className="text-sm text-black/60 dark:text-white/60 mt-2">
            Realza tu mirada con un toque de lujo. Citas fáciles desde nuestra app.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide">Enlaces</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <a className="hover:text-pink-500" href="#services">Servicios</a>
            </li>
            <li>
              <a className="hover:text-pink-500" href="#gallery">Galería</a>
            </li>
            <li>
              <a className="hover:text-pink-500" href="#app">Nuestra App</a>
            </li>
            <li>
              <Link className="hover:text-pink-500" href="/privacy_policy">
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-wide">Contacto</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>Whatsapp: +00 000 0000</li>
            <li>Email: contacto@lashess-by-prii.com</li>
            <li>IG: @lashessbyprii</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-6 border-t border-black/5 dark:border-white/5 text-black/60 dark:text-white/60">
        © {new Date().getFullYear()} Lashess By Prii. Todos los derechos reservados.
      </div>
    </footer>
  );
}

