"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { ReactNode } from "react";

type CrudDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
};

export default function CrudDialog({
  open,
  title,
  children,
  onClose,
  onSave,
}: CrudDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "grid", gap: 2 }}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
