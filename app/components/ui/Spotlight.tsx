"use client";
import React from "react";

type Props = {
  className?: string;
};

export const Spotlight: React.FC<Props> = ({ className }) => {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full blur-3xl " +
        (className ?? "")
      }
      style={{
        background:
          "radial-gradient(closest-side, rgba(236,72,153,0.35), rgba(236,72,153,0.15), transparent 60%)",
        maskImage:
          "radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.5), transparent 60%)",
      }}
    />
  );
};

