import api from "../api/axios";

// Registro
export const register = (data) => {
  return api.post("/auth/register", data);
};

// Login
export const login = (data) => {
  return api.post("/auth/login", data);
};
