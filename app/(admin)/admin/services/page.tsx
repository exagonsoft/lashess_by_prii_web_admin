"use client";
import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"; // ✅ removed GridValueFormatterParams
import DataTable from "@/app/components/admin/DataTable";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

type Service = {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  active: boolean;
};

export default function ServicesPage() {
  const [rows, setRows] = React.useState<Service[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Service | null>(null);
  const [toast, setToast] = React.useState<{
    open: boolean;
    msg: string;
    type: "success" | "error";
  }>({ open: false, msg: "", type: "success" });
  const [loading, setLoading] = React.useState(true);
  const [confirm, setConfirm] = React.useState<{ open: boolean; id?: string }>({
    open: false,
  });

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/services", { cache: "no-store" });
      if (res.ok) {
        setRows(await res.json());
      } else {
        setToast({
          open: true,
          msg: "Error cargando servicios",
          type: "error",
        });
      }
    } catch {
      setToast({ open: true, msg: "Error de red", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      price: Number(form.get("price") || 0),
      durationMin: Number(form.get("durationMin") || 60),
      active: true,
    };

    try {
      const res = await fetch(
        editing ? `/api/v1/services/${editing.id}` : "/api/v1/services",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      setToast({ open: true, msg: "Guardado", type: "success" });
      setOpen(false);
      setEditing(null);
      await load();
    } catch {
      setToast({ open: true, msg: "Error guardando", type: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
      setToast({ open: true, msg: "Eliminado", type: "success" });
    } catch {
      setToast({ open: true, msg: "Error eliminando", type: "error" });
    }
  };

  const toggleActive = async (s: Service) => {
    try {
      const res = await fetch(`/api/v1/services/${s.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !s.active }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setToast({ open: true, msg: "Error cambiando estado", type: "error" });
    }
  };

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
            setOpen(true);
          }}
        >
          Nuevo servicio
        </Button>
      </Stack>

      <DataTable<Service>
        rows={rows}
        loading={loading}
        height={560}
        columns={[
          { field: "name", headerName: "Nombre", flex: 1 },
          {
            field: "price",
            headerName: "Precio",
            width: 120,
            valueFormatter: (params: { value: number }) =>
              `$${Number(params.value ?? 0).toFixed(2)}`, // ✅ no GridValueFormatterParams
          },
          { field: "durationMin", headerName: "Duración (min)", width: 150 },
          {
            field: "active",
            headerName: "Estado",
            width: 140,
            renderCell: (p: GridRenderCellParams<Service>) => (
              <Chip
                size="small"
                color={p.value ? "success" : "default"}
                icon={p.value ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                label={p.value ? "Activo" : "Inactivo"}
                onClick={() => toggleActive(p.row as Service)}
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
            renderCell: (p: GridRenderCellParams<Service, Service>) => (
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    setEditing(p.row as Service);
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
                    setConfirm({ open: true, id: (p.row as Service).id })
                  }
                  startIcon={<DeleteOutline />}
                >
                  Borrar
                </Button>
              </Stack>
            ),
          },
        ] as GridColDef[]}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editing ? "Editar servicio" : "Nuevo servicio"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              name="name"
              label="Nombre"
              defaultValue={editing?.name || ""}
              required
            />
            <TextField
              name="price"
              type="number"
              label="Precio"
              defaultValue={editing?.price ?? 0}
              required
            />
            <TextField
              name="durationMin"
              type="number"
              label="Duración (min)"
              defaultValue={editing?.durationMin ?? 60}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={(_, reason) => {
          if (reason !== "clickaway") setToast({ ...toast, open: false });
        }}
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
