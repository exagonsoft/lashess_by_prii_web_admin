"use client";
import { Paper, Typography, Box } from "@mui/material";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>{value}</Typography>
    </Paper>
  );
}

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Panel de control</Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' } }}>
        <Stat label="Citas hoy" value={8} />
        <Stat label="Citas esta semana" value={42} />
        <Stat label="Clientes activos" value={128} />
        <Stat label="Ingresos (estim.)" value={"$2,340"} />
      </Box>
      <Paper variant="outlined" sx={{ mt: 3, p: 2, borderRadius: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Actividad reciente</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Aquí verás las nuevas reservas, pagos y reseñas.</Typography>
      </Paper>
    </Box>
  );
}
