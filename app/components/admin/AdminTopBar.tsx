"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

type Props = {
  onMenuClick: () => void;
};

export default function AdminTopBar({ onMenuClick }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
    } catch {}
    try {
      localStorage.removeItem("token");
    } catch {}
    router.push("/auth");
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <IconButton onClick={onMenuClick} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Panel de administración
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button size="small" variant="outlined" onClick={handleLogout}>
            Salir
          </Button>
          <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
