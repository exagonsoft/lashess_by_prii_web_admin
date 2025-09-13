"use client";
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { IUser } from "@/lib/interfaces/types";
import { firebaseConfig } from "@/lib/settings/firebaseClient";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ClientsPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data: IUser[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<IUser, "id">),
        }));
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Clientes
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
        {loading ? (
          <CircularProgress size={24} />
        ) : users.length === 0 ? (
          "No hay clientes aún."
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemAvatar>
                  <Avatar src={user.photoUrl}>
                    {user.name?.[0] || "?"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </div>
  );
}
