import api from "../api/axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export const register = (data) => {
  return api.post("/auth/register", data);
};
export const login = (data) => {
  return api.post("/auth/login", data);
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // await api.post("/auth/google", {
    //   name: user.displayName,
    //   email: user.email,
    //   uid: user.uid,
    // });

    return user;
  } catch (error) {
    console.error("Error login Google:", error);
    throw error;
  }
};