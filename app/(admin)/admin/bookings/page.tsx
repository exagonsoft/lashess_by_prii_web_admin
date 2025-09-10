"use client";
import { Paper, Typography } from "@mui/material";

export default function BookingsPage() {
  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Citas</Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        Próximamente: calendario y listado de citas.
      </Paper>
    </div>
  );
}

