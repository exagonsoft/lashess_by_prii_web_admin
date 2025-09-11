"use client";
import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";

type ImageUploaderProps = {
  label?: string;
  value?: string;
  onChange: (url: string | null) => void;
};

export default function ImageUploader({ label, value, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/v1/private/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setPreview(data.url);
      onChange(data.url); // return public URL to parent
    } catch (err) {
      console.error(err);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}

      <Box
        onClick={() => !uploading && fileInputRef.current?.click()}
        sx={{
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: "background.default",
          "&:hover": { borderColor: "primary.main" },
        }}
      >
        {uploading ? (
          <CircularProgress size={24} />
        ) : preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={160}
            height={160}
            style={{ maxHeight: 160, objectFit: "contain", margin: "0 auto" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Haz clic para seleccionar una imagen
          </Typography>
        )}
      </Box>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {preview && !uploading && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            setPreview(null);
            onChange(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        >
          Quitar imagen
        </Button>
      )}
    </Box>
  );
}
