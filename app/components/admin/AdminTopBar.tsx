"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onMenuClick: () => void;
};

export default function AdminTopBar({ onMenuClick }: Props) {
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
        <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
      </Toolbar>
    </AppBar>
  );
}
