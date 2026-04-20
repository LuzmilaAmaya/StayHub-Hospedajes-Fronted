import api from "../api/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export const register = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const googleLoginBackend = (data) => {
  return api.post("/auth/google", data);
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error login Google:", error);
    throw error;
  }
};
