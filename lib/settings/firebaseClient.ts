
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔑 Firebase config (replace with env vars in production)
export const firebaseConfig = {
  apiKey: "AIzaSyBJb_vfJwfKlJJfl3Q3QQLOQ6e7JLGRn8w",
  authDomain: "lashess-by-prii.firebaseapp.com",
  projectId: "lashess-by-prii",
  storageBucket: "lashess-by-prii.firebasestorage.app",
  messagingSenderId: "302024968063",
  appId: "1:302024968063:web:4dba822d78069e065fbc4a",
  measurementId: "G-B6GB71YN0C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();