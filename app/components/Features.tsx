"use client";
import { Paper, Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedIcon from "@mui/icons-material/Verified";
import CleanHandsIcon from "@mui/icons-material/CleanHands";

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)") }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 2, bgcolor: "#fce7f3", color: "primary.main" }}>
        {icon}
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 1.5, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {desc}
      </Typography>
    </Paper>
  );
}

export default function Features() {
  const items = [
    { icon: <CalendarMonthIcon fontSize="small" />, title: "Reserva inteligente", desc: "Gestiona citas, recordatorios y pagos desde la app." },
    { icon: <AutoAwesomeIcon fontSize="small" />, title: "Técnica personalizada", desc: "Diseños adaptados a tu rostro y estilo." },
    { icon: <VerifiedIcon fontSize="small" />, title: "Materiales premium", desc: "Pestañas hipoalergénicas y adhesivos profesionales." },
    { icon: <CleanHandsIcon fontSize="small" />, title: "Studio higiénico", desc: "Protocolos de limpieza y desinfección certificados." },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-52 grid gap-6 md:grid-cols-4">
      {items.map((f) => (
        <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
      ))}
    </div>
  );
}

