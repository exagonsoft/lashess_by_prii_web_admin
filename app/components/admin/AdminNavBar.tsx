"use client";
import React from "react";
import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  nav: NavItem[];
  collapsed: boolean;
  onToggle: () => void;
};

export default function AdminNav({ nav, collapsed, onToggle }: Props) {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 60px)",
        position: "relative",
      }}
    >
      <List sx={{ flexGrow: 1, mt: 1 }}>
        {nav.map((n) => {
          const selected = pathname === n.href;
          const item = (
            <ListItemButton
              key={n.href}
              component={Link}
              href={n.href}
              selected={selected}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                justifyContent: collapsed ? "center" : "flex-start",
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
                {n.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={n.label} />}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip key={n.href} title={n.label} placement="right">
              {item}
            </Tooltip>
          ) : (
            item
          );
        })}
      </List>

      <Divider />
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
        }}
      >
        <IconButton onClick={onToggle} size="small">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
