"use client";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const items = [
    {
      q: "¿Cómo reservo una cita?",
      a: "Puedes reservar desde nuestra app o haciendo clic en 'Reservar' y eligiendo servicio y horario.",
    },
    {
      q: "¿Cuánto dura el servicio?",
      a: "Depende del tipo de aplicación. Las clásicas tardan ~90 min, volumen ~120 min.",
    },
    {
      q: "¿Es seguro para ojos sensibles?",
      a: "Usamos materiales hipoalergénicos y técnicas seguras. Si tienes dudas, consúltanos antes de reservar.",
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-24">
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Preguntas frecuentes</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Todo lo que necesitas saber antes de tu cita.
      </Typography>
      {items.map((it) => (
        <Accordion key={it.q} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 500 }}>{it.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">{it.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
}

