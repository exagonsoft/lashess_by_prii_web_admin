"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { IStylist } from "@/lib/interfaces/types";
import ImageUploader from "@/app/components/ui/ImageUploader"; // ✅ import your uploader

const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";

export default function StylistsPage() {
  const [stylists, setStylists] = useState<IStylist[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<IStylist | null>(null);
  const [form, setForm] = useState<IStylist>({
    name: "",
    contact: "",
    address: "",
    picture: "",
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ name: "", contact: "", address: "", picture: "" });
  };

  // === Fetch stylists ===
  const fetchStylists = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/v1/private/stylists`);
      if (!res.ok) throw new Error("Failed to fetch stylists");
      const data = await res.json();
      setStylists(data);
    } catch (error) {
      console.error("Error fetching estilistas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  // === Save stylist (create/update) ===
  const handleSave = async () => {
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
        ? `${apiBase}/api/v1/private/stylists/${editing._id}`
        : `${apiBase}/api/v1/private/stylists`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save stylist");
      const updated = await res.json();

      setStylists((prev) =>
        editing
          ? prev.map((s) => (s._id === updated._id ? updated : s))
          : [...prev, updated]
      );

      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving estilista:", error);
    }
  };

  // === Delete stylist ===
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`${apiBase}/api/v1/private/stylists/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete stylist");
      setStylists((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting estilista:", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Estilistas
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : stylists.length === 0 ? (
          "No hay estilistas aún."
        ) : (
          <List>
            {stylists.map((s) => (
              <ListItem
                key={s._id}
                divider
                secondaryAction={
                  <>
                    <Button
                      size="small"
                      onClick={() => {
                        setEditing(s);
                        setForm(s);
                        setOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(s._id)}
                    >
                      Eliminar
                    </Button>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar src={s.picture}>{s.name?.[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={s.name}
                  secondary={`${s.contact} — ${s.address}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
      >
        Agregar Estilista
      </Button>

      {/* === Dialog for Add/Edit === */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editing ? "Editar Estilista" : "Agregar Estilista"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Contacto"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            fullWidth
          />
          <TextField
            label="Dirección"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            fullWidth
          />

          {/* ✅ Use ImageUploader instead of raw TextField */}
          <ImageUploader
            label="Foto de Estilista"
            value={form.picture}
            onChange={(url) => setForm({ ...form, picture: url || "" })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
