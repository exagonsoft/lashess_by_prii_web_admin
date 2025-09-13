"use client";
import React from "react";
import { Drawer, Box, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import BuildIcon from "@mui/icons-material/Build";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AdminTopBar from "@/app/components/admin/AdminTopBar";
import AdminNav from "@/app/components/admin/AdminNavBar";
import { AuthProvider } from "@/lib/context/AuthProvider";

const nav = [
  { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/admin/services", label: "Servicios", icon: <Inventory2Icon /> },
  { href: "/admin/bookings", label: "Citas", icon: <EventIcon /> },
  { href: "/admin/tools", label: "Inventario", icon: <BuildIcon /> },
  { href: "/admin/offers", label: "Ofertas", icon: <LocalOfferIcon /> },
  { href: "/admin/gallery", label: "Galería", icon: <PhotoLibraryIcon /> },
  {
    href: "/admin/stylists",
    label: "Estilistas",
    icon: <ContentCutIcon />,
  },
  { href: "/admin/clients", label: "Clientes", icon: <GroupIcon /> },
  { href: "/admin/settings", label: "Configuración", icon: <SettingsIcon /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <AuthProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AdminTopBar onMenuClick={() => setOpen(true)} />

        {/* Sidebar desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            width: collapsed ? 72 : 240,
            [`& .MuiDrawer-paper`]: {
              width: collapsed ? 72 : 240,
              top: 64,
              borderRight: "1px solid",
              borderColor: "divider",
              transition: "width 0.2s",
              overflowX: "hidden",
            },
          }}
          open
        >
          <AdminNav
            nav={nav}
            collapsed={collapsed}
            onToggle={() => setCollapsed((p) => !p)}
          />
        </Drawer>

        {/* Sidebar mobile */}
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: { md: "none" } }}
        >
          <Box sx={{ width: 240 }}>
            <AdminNav nav={nav} collapsed={false} onToggle={() => {}} />
          </Box>
        </Drawer>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, ml: 0, mt: 10 }}>
          <Container maxWidth="lg" sx={{ py: 3 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </AuthProvider>
  );
}
