"use client";
import * as React from "react";
import {
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
  TextField,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CrudTable from "@/app/components/ui/CustomTable";
import CrudDialog from "@/app/components/ui/CustomDialog";
import ImageUploader from "@/app/components/ui/ImageUploader";
import { GridColDef } from "@mui/x-data-grid";
import ApiFetcher from "@/lib/utils/fetcher";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import Image from "next/image";
// IGallery not needed client-side here

const API_BASE = "/api/v1/private/gallery";

type Row = {
  id: string;
  imageUrl: string;
  alt: string;
  order: number;
  published: boolean;
};

export default function GalleryPage() {
  const { token } = useAuthToken();
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Row | null>(null);
  const [form, setForm] = React.useState<Partial<Row>>({
    imageUrl: "",
    alt: "",
    order: 0,
    published: true,
  });
  const [toast, setToast] = React.useState({
    open: false,
    msg: "",
    type: "success" as "success" | "error",
  });

  const showToast = (m: string, t: "success" | "error") =>
    setToast({ open: true, msg: m, type: t });

  const load = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await ApiFetcher.get<Row[]>(API_BASE, token);
      setRows(data);
    } catch {
      showToast("Error cargando galería", "error");
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
      setForm({ imageUrl: "", alt: "", order: 0, published: true });
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
    { field: "alt", headerName: "Alt", flex: 1 },
    {
      field: "imageUrl",
      headerName: "Imagen",
      flex: 1,
      renderCell: (p) =>
        p.value ? (
          <Image
            src={p.value}
            alt="preview"
            width={50}
            height={50}
            style={{ width: 50, height: 50, borderRadius: 4 }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Sin imagen
          </Typography>
        ),
    },
    {
      field: "published",
      headerName: "Publicado",
      width: 130,
      renderCell: (p) => (
        <Chip
          size="small"
          label={p.value ? "Sí" : "No"}
          color={p.value ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 260,
      renderCell: (p) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setEditing(p.row as Row);
              setForm(p.row as Row);
              setOpen(true);
            }}
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            variant="text"
            onClick={() => handleDelete((p.row as Row).id)}
          >
            Borrar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Galería
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Imágenes
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setForm({ imageUrl: "", alt: "", order: 0, published: true });
            setOpen(true);
          }}
        >
          Nueva imagen
        </Button>
      </Stack>

      <CrudTable<Row> rows={rows} columns={columns} loading={loading} />

      <CrudDialog
        open={open}
        title={editing ? "Editar imagen" : "Nueva imagen"}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      >
        <ImageUploader
          label="Imagen"
          value={form.imageUrl || ""}
          onChange={(url) => setForm({ ...form, imageUrl: url || "" })}
        />
        <TextField
          label="Alt"
          value={form.alt || ""}
          onChange={(e) => setForm({ ...form, alt: e.target.value })}
        />
        <TextField
          type="number"
          label="Orden"
          value={form.order ?? 0}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
          }
          label="Publicado"
        />
      </CrudDialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
