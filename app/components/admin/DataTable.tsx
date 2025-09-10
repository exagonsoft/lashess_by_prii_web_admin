"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridToolbar, GridValidRowModel } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export type DataTableProps<T extends { id: string | number }> = {
  rows: T[];
  columns: GridColDef<T>[];
  loading?: boolean;
  pageSize?: number;
  height?: number;
};

export default function DataTable<T extends { id: string | number }>(
  { rows, columns, loading, pageSize = 10, height = 520 }: DataTableProps<T>
) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: "100%", height }}>
        <DataGrid
          rows={rows as unknown as GridValidRowModel[]}
          columns={columns as unknown as GridColDef[]}
          loading={loading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize } } }}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } } }}
        />
      </div>
    </Paper>
  );
}
