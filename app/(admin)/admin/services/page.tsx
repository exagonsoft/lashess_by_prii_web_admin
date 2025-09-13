"use client";
import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Chip,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { GridColDef } from "@mui/x-data-grid";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import CrudDialog from "@/app/components/ui/CustomDialog";
import CrudTable from "@/app/components/ui/CustomTable";
import ImageUploader from "@/app/components/ui/ImageUploader";
import { IService } from "@/lib/interfaces/types";
import ApiFetcher from "@/lib/utils/fetcher";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import Image from "next/image";

const API_BASE = "/api/v1/private/services";

export default function ServicesPage() {
  const { token } = useAuthToken(); // 🔑 get token from context

  const [rows, setRows] = React.useState<IService[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<IService | null>(null);
  const [form, setForm] = React.useState<Partial<IService>>({
    name: "",
    price: 0,
    durationMin: 60,
    active: true,
    order: 0,
    imageUrl: "",
  });

  const [toast, setToast] = React.useState({
    open: false,
    msg: "",
    type: "success" as "success" | "error",
  });
  const [confirm, setConfirm] = React.useState<{ open: boolean; id?: string }>({
    open: false,
  });

  const showToast = (msg: string, type: "success" | "error") =>
    setToast({ open: true, msg, type });

  const load = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await ApiFetcher.get<IService[]>(API_BASE, token);
      setRows(data);
    } catch {
      showToast("Error cargando servicios", "error");
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
      showToast("Guardado", "success");
      setOpen(false);
      setEditing(null);
      setForm({
        name: "",
        price: 0,
        durationMin: 60,
        active: true,
        order: 0,
        imageUrl: "",
      });
      await load();
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

  const toggleActive = async (s: IService) => {
    if (!token) return;
    try {
      await ApiFetcher.put(`${API_BASE}/${s.id}`, { active: !s.active }, token);
      await load();
    } catch {
      showToast("Error cambiando estado", "error");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      valueFormatter: (v) => `$${Number(v ?? 0).toFixed(2)}`,
    },
    { field: "durationMin", headerName: "Duración (min)", width: 150 },
    { field: "order", headerName: "Orden", width: 100 },
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
      field: "active",
      headerName: "Estado",
      width: 140,
      renderCell: (p) => (
        <Chip
          size="small"
          color={p.value ? "success" : "default"}
          icon={p.value ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          label={p.value ? "Activo" : "Inactivo"}
          onClick={() => toggleActive(p.row as IService)}
          variant={p.value ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 180,
      sortable: false,
      filterable: false,
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
            variant="text"
            onClick={() => {
              setEditing(p.row as IService);
              setForm(p.row as IService);
              setOpen(true);
            }}
            startIcon={<EditOutlined />}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={() =>
              setConfirm({ open: true, id: (p.row as IService).id })
            }
            startIcon={<DeleteOutline />}
          >
            Borrar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Servicios
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Lista
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setForm({
              name: "",
              price: 0,
              durationMin: 60,
              active: true,
              order: 0,
              imageUrl: "",
            });
            setOpen(true);
          }}
        >
          Nuevo servicio
        </Button>
      </Stack>

      <CrudTable<IService> rows={rows} loading={loading} columns={columns} />

      <CrudDialog
        open={open}
        title={editing ? "Editar servicio" : "Nuevo servicio"}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      >
        <TextField
          label="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <TextField
          type="number"
          label="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
        />
        <TextField
          type="number"
          label="Duración (min)"
          value={form.durationMin}
          onChange={(e) =>
            setForm({ ...form, durationMin: Number(e.target.value) })
          }
          required
        />
        <TextField
          type="number"
          label="Orden"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
        />
        <ImageUploader
          label="Imagen"
          value={form.imageUrl || ""}
          onChange={(url) => setForm({ ...form, imageUrl: url || "" })}
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

      <ConfirmDialog
        open={confirm.open}
        message="¿Eliminar este servicio? Esta acción no se puede deshacer."
        onClose={() => setConfirm({ open: false })}
        onConfirm={async () => {
          if (confirm.id) {
            await handleDelete(confirm.id);
            setConfirm({ open: false });
          }
        }}
      />
    </Box>
  );
}
