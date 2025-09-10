"use client";
import { Button } from "@mui/material";

export default function CTAButtons() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <Button id="booking" href="#services" variant="contained" color="primary" size="large">
        Ver servicios
      </Button>
      <Button href="#app" variant="outlined" color="primary" size="large">
        Descargar App
      </Button>
    </div>
  );
}

