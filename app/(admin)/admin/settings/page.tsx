"use client";
import { Paper, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Configuración</Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        Próximamente: datos del estudio, horarios, notificaciones y pagos.
      </Paper>
    </div>
  );
}

