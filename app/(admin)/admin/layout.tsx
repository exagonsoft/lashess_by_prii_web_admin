"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Container, useTheme } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const nav = [
    { href: "/admin", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
    { href: "/admin/services", label: "Servicios", icon: <Inventory2Icon fontSize="small" /> },
    { href: "/admin/bookings", label: "Citas", icon: <EventIcon fontSize="small" /> },
    { href: "/admin/clients", label: "Clientes", icon: <GroupIcon fontSize="small" /> },
    { href: "/admin/settings", label: "Configuración", icon: <SettingsIcon fontSize="small" /> },
  ];
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.default} 60%, ${theme.palette.action.hover})` }}>
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider", backdropFilter: 'blur(8px)' }}>
        <Toolbar>
          <IconButton onClick={() => setOpen(true)} sx={{ mr: 1, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Image src="/logo.svg" alt="Lashess By Prii" width={28} height={28} />
            <Link href="/admin" className="font-semibold">Admin</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open sx={{ display: { xs: "none", md: "block" }, width: 240, [`& .MuiDrawer-paper`]: { width: 240, top: 64, borderRight: '1px solid', borderColor: 'divider' } }}>
        <List>
          {nav.map((n) => {
            const selected = pathname === n.href;
            return (
            <ListItemButton key={n.href} component={Link} href={n.href} selected={selected}>
              <ListItemIcon>{n.icon}</ListItemIcon>
              <ListItemText primary={n.label} />
            </ListItemButton>
          )})}
        </List>
      </Drawer>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{ display: { md: "none" } }}>
        <Box sx={{ width: 240 }}>
          <List>
            {nav.map((n) => (
              <ListItemButton key={n.href} component={Link} href={n.href} onClick={() => setOpen(false)}>
                <ListItemIcon>{n.icon}</ListItemIcon>
                <ListItemText primary={n.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, ml: { md: 30 }, mt: 10 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
