/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type CrudTableProps<T> = {
  rows: T[];
  columns: GridColDef[];
  loading: boolean;
  height?: number;
};

export default function CrudTable<T>({
  rows,
  columns,
  loading,
  height = 560,
}: CrudTableProps<T>) {
  return (
    <Box sx={{ height, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => (row as any)._id || (row as any).id}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 50]}
      />
    </Box>
  );
}
