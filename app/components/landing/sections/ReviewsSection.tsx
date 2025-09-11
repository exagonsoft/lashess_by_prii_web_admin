import React from 'react'
import SectionWrapper from '../SectionWrapper'

const ReviewsSection = () => {
  return (
    <SectionWrapper id="reviews" className="">
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
      </SectionWrapper>
  )
}

export default ReviewsSection