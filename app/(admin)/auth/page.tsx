/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState, Suspense } from "react";
import { auth, googleProvider } from "@/lib/settings/firebaseClient";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { TextField, Button, Box, Typography, Alert, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";

function LoginInner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      localStorage.setItem("token", token);
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const next = searchParams.get("next") || "/admin";
      router.push(next);
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const token = await res.user.getIdToken();
      localStorage.setItem("token", token);
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const next = searchParams.get("next") || "/admin";
      router.push(next);
    } catch (err: any) {
      setError("Error al iniciar sesión con Google");
    }
  };

  // If already authenticated server-side, leave /auth automatically
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { method: "GET" });
        if (!active) return;
        if (res.ok) {
          const next = searchParams.get("next") || "/admin";
          router.replace(next);
        }
      } catch {}
    })();
    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Login Administrador</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Stack spacing={2}>
        <Button variant="contained" onClick={handleLogin}>
          Ingresar
        </Button>

        <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
          Ingresar con Google
        </Button>
      </Stack>
    </Box>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
