"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Box,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRounded from "@mui/icons-material/CloseRounded";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: "#services", label: "Servicios" },
    { href: "#gallery", label: "Galería" },
    { href: "#reviews", label: "Opiniones" },
    { href: "#app", label: "App" },
    { href: "#contact", label: "Contacto" },
  ];
  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: "blur(8px)", zIndex: 50 }}>
      <Container maxWidth="lg" sx={{ mt: 1.5 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.5, md: 1 },
            border: "1px solid",
            borderColor: "divider",
            bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)"),
            backdropFilter: "blur(8px)",
          }}
        >
          <Toolbar disableGutters sx={{ minHeight: 56, px: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Image src="/logo.svg" alt="Lashess By Prii" width={32} height={32} />
              <Link href="/" className="font-semibold tracking-wide">
                Lashess By Prii
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
              {navItems.map((i) => (
                <Button key={i.href} href={i.href} color="inherit" size="small">
                  {i.label}
                </Button>
              ))}
              <Button href="#booking" variant="contained" color="primary" size="small" sx={{ borderRadius: 9999 }}>
                Reservar
              </Button>
            </Box>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" }, ml: 1 }}
              aria-label="Abrir menú"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Paper>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation" onClick={() => setOpen(false)}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Image src="/logo.svg" alt="Lashess By Prii" width={24} height={24} />
              <span className="font-medium">Lashess By Prii</span>
            </Box>
            <IconButton aria-label="Cerrar menú">
              <CloseRounded />
            </IconButton>
          </Box>
          <List>
            {navItems.map((i) => (
              <ListItemButton component="a" href={i.href} key={i.href}>
                <ListItemText primary={i.label} />
              </ListItemButton>
            ))}
            <ListItemButton component="a" href="#booking">
              <ListItemText primary="Reservar" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
