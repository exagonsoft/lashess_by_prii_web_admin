"use client";
import * as React from "react";
import {
  Typography,
  Stack,
  Button,
  Chip,
  Snackbar,
  Alert,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import CrudTable from "@/app/components/ui/CustomTable";
import CrudDialog from "@/app/components/ui/CustomDialog";
import { GridColDef } from "@mui/x-data-grid";
import ApiFetcher from "@/lib/utils/fetcher";
import { useAuthToken } from "@/lib/hooks/useAuthToken";
import { IBooking, ITool } from "@/lib/interfaces/types";

const API_BOOKINGS = "/api/v1/private/bookings";
const API_TOOLS = "/api/v1/private/tools";

type ToolLine = { toolId: string; name?: string; quantity: number; unit?: string };

export default function BookingsPage() {
  const { token } = useAuthToken();
  const [rows, setRows] = React.useState<IBooking[]>([]);
  const [tools, setTools] = React.useState<ITool[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [toast, setToast] = React.useState({ open: false, msg: "", type: "success" as "success" | "error" });
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<IBooking | null>(null);
  const [price, setPrice] = React.useState<number>(0);
  const [usage, setUsage] = React.useState<ToolLine[]>([]);
  const [note, setNote] = React.useState("");

  const showToast = (msg: string, type: "success" | "error") => setToast({ open: true, msg, type });

  const load = React.useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [bks, tls] = await Promise.all([
        ApiFetcher.get<IBooking[]>(API_BOOKINGS, token),
        ApiFetcher.get<ITool[]>(API_TOOLS, token),
      ]);
      setRows(bks);
      setTools(tls);
    } catch {
      showToast("Error cargando datos", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    load();
  }, [load]);

  const cancelBooking = async (id: string) => {
    if (!token) return;
    try {
      await ApiFetcher.delete(`${API_BOOKINGS}/${id}`, token);
      await load();
      showToast("Cita cancelada", "success");
    } catch {
      showToast("No se pudo cancelar", "error");
    }
  };

  const openProcess = (b: IBooking) => {
    setEditing(b);
    setPrice(b.price || 0);
    setUsage((b.toolsUsed || []).map((u) => ({ ...u })));
    setNote(b.notes || "");
    setOpen(true);
  };

  const saveProcess = async () => {
    if (!token || !editing) return;
    try {
      await ApiFetcher.put(
        `${API_BOOKINGS}/${editing.id}`,
        {
          status: "processed",
          price,
          toolsUsed: usage.map((u) => ({
            toolId: u.toolId,
            name: u.name,
            quantity: Number(u.quantity || 0),
          })),
          notes: note,
        },
        token
      );
      setOpen(false);
      setEditing(null);
      await load();
      showToast("Cita procesada", "success");
    } catch {
      showToast("No se pudo procesar", "error");
    }
  };

  const addToolLine = () =>
    setUsage([
      ...usage,
      { toolId: tools[0]?.id || "", name: tools[0]?.name, quantity: 1, unit: tools[0]?.unit },
    ]);
  const removeToolLine = (idx: number) => setUsage(usage.filter((_, i) => i !== idx));
  const updateToolLine = (idx: number, patch: Partial<ToolLine>) => {
    setUsage(usage.map((u, i) => (i === idx ? { ...u, ...patch } : u)));
  };

  const columns: GridColDef[] = [
    {
      field: "scheduledAt",
      headerName: "Fecha",
      width: 170,
      valueFormatter: (v) => new Date(v as string).toLocaleString(),
    },
    { field: "customerName", headerName: "Cliente", flex: 1 },
    { field: "serviceName", headerName: "Servicio", flex: 1 },
    { field: "stylistName", headerName: "Estilista", width: 140 },
    { field: "price", headerName: "Precio", width: 120, valueFormatter: (v) => (v ? `$${Number(v).toFixed(2)}` : "-") },
    {
      field: "status",
      headerName: "Estado",
      width: 130,
      renderCell: (p) => (
        <Chip
          size="small"
          label={String(p.value)}
          color={p.value === "processed" ? "success" : p.value === "canceled" ? "default" : "warning"}
        />
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
            disabled={p.row.status !== "scheduled"}
            onClick={() => openProcess(p.row as IBooking)}
          >
            Procesar
          </Button>
          <Button
            size="small"
            color="error"
            variant="text"
            disabled={p.row.status !== "scheduled"}
            onClick={() => cancelBooking((p.row as IBooking).id)}
          >
            Cancelar
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Citas
      </Typography>

      <CrudTable<IBooking> rows={rows} columns={columns} loading={loading} />

      <CrudDialog
        open={open}
        title={editing ? `Procesar cita - ${editing.customerName}` : "Procesar cita"}
        onClose={() => setOpen(false)}
        onSave={saveProcess}
      >
        <TextField
          type="number"
          label="Precio"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <TextField
          label="Notas"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          multiline
          minRows={2}
        />

        <Typography variant="subtitle2">Herramientas usadas</Typography>
        <Stack spacing={1}>
          {usage.map((u, idx) => (
            <Stack key={idx} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
              <TextField
                select
                label="Herramienta"
                value={u.toolId}
                onChange={(e) => {
                  const t = tools.find((x) => x.id === e.target.value);
                  updateToolLine(idx, { toolId: e.target.value, name: t?.name, unit: t?.unit });
                }}
                sx={{ minWidth: 220 }}
              >
                {tools.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name} (stock: {t.stock})
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                label="Cantidad"
                value={u.quantity}
                onChange={(e) => updateToolLine(idx, { quantity: Number(e.target.value) })}
                sx={{ width: 140 }}
              />
              <Button color="error" onClick={() => removeToolLine(idx)}>
                Quitar
              </Button>
            </Stack>
          ))}

          <Button variant="outlined" onClick={addToolLine} disabled={tools.length === 0}>
            Agregar herramienta
          </Button>
        </Stack>
      </CrudDialog>

      <Snackbar open={toast.open} autoHideDuration={2000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
