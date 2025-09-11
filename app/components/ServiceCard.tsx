"use client";
import Image from "next/image";
import { Card, CardContent } from "@mui/material";

export default function ServiceCard({ name, price, image }: { name: string; price: number, image: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <Image src={image} alt="Servicio" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white drop-shadow">
          <div className="text-sm opacity-90">{name}</div>
          <div className="text-lg font-semibold">{price}</div>
        </div>
      </div>
      <CardContent className="text-sm text-black/70 dark:text-white/70">
        Resultado natural y duradero. Incluye evaluación de estilo y recomendaciones.
      </CardContent>
    </Card>
  );
}

