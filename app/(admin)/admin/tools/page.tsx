"use client";
import * as React from "react";
import { Typography, Stack, Button, Snackbar, Alert, TextField, Chip } from "@mui/material";
import CrudTable from "@/app/components/ui/CustomTable";
import CrudDialog from "@/app/components/ui/CustomDialog";
import { GridColDef } from "@mui/x-data-grid";
import ApiFetcher from "@/lib/utils/fetcher";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import { ITool } from "@/lib/interfaces/types";

const API_TOOLS = "/api/v1/private/tools";

export default function ToolsPage() {
  const { token } = useAuthToken();
  const [rows, setRows] = React.useState<ITool[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ITool | null>(null);
  const [form, setForm] = React.useState<Partial<ITool>>({ name: "", sku: "", stock: 0, unit: "pcs", type: "", active: true });
  const [toast, setToast] = React.useState({ open: false, msg: "", type: "success" as "success" | "error" });

  const showToast = (msg: string, type: "success" | "error") => setToast({ open: true, msg, type });

  const load = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await ApiFetcher.get<ITool[]>(API_TOOLS, token);
      setRows(data);
    } catch {
      showToast("Error cargando inventario", "error");
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
        await ApiFetcher.put(`${API_TOOLS}/${editing.id}`, form, token);
      } else {
        await ApiFetcher.post(API_TOOLS, form, token);
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: "", sku: "", stock: 0, unit: "pcs", type: "", active: true });
      await load();
      showToast("Guardado", "success");
    } catch {
      showToast("Error guardando", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await ApiFetcher.delete(`${API_TOOLS}/${id}`, token);
      await load();
      showToast("Eliminado", "success");
    } catch {
      showToast("Error eliminando", "error");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "sku", headerName: "SKU", width: 120 },
    { field: "type", headerName: "Tipo", width: 140 },
    { field: "unit", headerName: "Unidad", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "active",
      headerName: "Estado",
      width: 120,
      renderCell: (p) => (
        <Chip size="small" label={p.value ? "Activo" : "Inactivo"} color={p.value ? "success" : "default"} />
      ),
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
              setEditing(p.row as ITool);
              setForm(p.row as ITool);
              setOpen(true);
            }}
          >
            Editar
          </Button>
          <Button size="small" color="error" variant="text" onClick={() => handleDelete((p.row as ITool).id)}>
            Borrar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Inventario
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Herramientas y consumibles
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setForm({ name: "", sku: "", stock: 0, unit: "pcs", type: "", active: true });
            setOpen(true);
          }}
        >
          Nuevo
        </Button>
      </Stack>

      <CrudTable<ITool> rows={rows} columns={columns} loading={loading} />

      <CrudDialog open={open} title={editing ? "Editar herramienta" : "Nueva herramienta"} onClose={() => setOpen(false)} onSave={handleSave}>
        <TextField label="Nombre" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <TextField label="SKU" value={form.sku || ""} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        <TextField label="Tipo" value={form.type || ""} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        <TextField label="Unidad" value={form.unit || "pcs"} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
        <TextField type="number" label="Stock" value={form.stock ?? 0} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
      </CrudDialog>

      <Snackbar open={toast.open} autoHideDuration={2000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

