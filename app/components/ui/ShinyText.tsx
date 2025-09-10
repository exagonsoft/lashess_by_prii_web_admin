"use client";
import React from "react";

export default function ShinyText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #ec4899, #7c3aed, #ec4899)",
        backgroundSize: "200% 100%",
        animation: "shine 6s linear infinite",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}

