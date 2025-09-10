"use client";
import { Paper, Typography } from "@mui/material";

export default function ClientsPage() {
  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Clientes</Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        Próximamente: gestión de clientes.
      </Paper>
    </div>
  );
}

