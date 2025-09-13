"use client";
import * as React from "react";
import { Typography, Stack, Button, Snackbar, Alert, TextField, Chip, Switch, FormControlLabel } from "@mui/material";
import CrudTable from "@/app/components/ui/CustomTable";
import CrudDialog from "@/app/components/ui/CustomDialog";
import ImageUploader from "@/app/components/ui/ImageUploader";
import { GridColDef } from "@mui/x-data-grid";
import ApiFetcher from "@/lib/utils/fetcher";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import { IOffer } from "@/lib/interfaces/types";

const API_BASE = "/api/v1/private/offers";

export default function OffersPage() {
  const { token } = useAuthToken();
  const [rows, setRows] = React.useState<IOffer[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<IOffer | null>(null);
  const [form, setForm] = React.useState<Partial<IOffer>>({ title: "", description: "", imageUrl: "", active: true, order: 0 });
  const [toast, setToast] = React.useState({ open: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (m: string, t: "success" | "error") => setToast({ open: true, msg: m, type: t });

  const load = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await ApiFetcher.get<IOffer[]>(API_BASE, token);
      setRows(data);
    } catch {
      showToast("Error cargando ofertas", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!token) return;
    try {
      if (editing) {
        await ApiFetcher.put(`${API_BASE}/${editing.id}`, form, token);
      } else {
        await ApiFetcher.post(API_BASE, form, token);
      }
      setOpen(false);
      setEditing(null);
      setForm({ title: "", description: "", imageUrl: "", active: true, order: 0 });
      await load();
      showToast("Guardado", "success");
    } catch {
      showToast("Error guardando", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await ApiFetcher.delete(`${API_BASE}/${id}`, token);
      await load();
      showToast("Eliminado", "success");
    } catch {
      showToast("Error eliminando", "error");
    }
  };

  const columns: GridColDef[] = [
    { field: "order", headerName: "Orden", width: 100 },
    { field: "title", headerName: "Titulo", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1 },
    {
      field: "active",
      headerName: "Activa",
      width: 120,
      renderCell: (p) => <Chip size="small" label={p.value ? "Sí" : "No"} color={p.value ? "success" : "default"} />,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 260,
      renderCell: (p) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setEditing(p.row as IOffer);
              setForm(p.row as IOffer);
              setOpen(true);
            }}
          >
            Editar
          </Button>
          <Button size="small" color="error" variant="text" onClick={() => handleDelete((p.row as IOffer).id)}>
            Borrar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Ofertas
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Listado
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setForm({ title: "", description: "", imageUrl: "", active: true, order: 0 });
            setOpen(true);
          }}
        >
          Nueva oferta
        </Button>
      </Stack>

      <CrudTable<IOffer> rows={rows} columns={columns} loading={loading} />

      <CrudDialog open={open} title={editing ? "Editar oferta" : "Nueva oferta"} onClose={() => setOpen(false)} onSave={handleSave}>
        <TextField label="Título" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <TextField label="Descripción" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline minRows={3} />
        <ImageUploader label="Imagen" value={form.imageUrl || ""} onChange={(url) => setForm({ ...form, imageUrl: url || "" })} />
        <TextField type="number" label="Orden" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
        <FormControlLabel control={<Switch checked={!!form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />} label="Activa" />
        <TextField type="datetime-local" label="Inicio" value={form.startsAt ? form.startsAt.substring(0, 16) : ""} onChange={(e) => setForm({ ...form, startsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })} />
        <TextField type="datetime-local" label="Fin" value={form.endsAt ? form.endsAt.substring(0, 16) : ""} onChange={(e) => setForm({ ...form, endsAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })} />
      </CrudDialog>

      <Snackbar open={toast.open} autoHideDuration={2000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

