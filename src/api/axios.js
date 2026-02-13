import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Request: agrega el token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 👉 Response: manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Error inesperado en el servidor";

    return Promise.reject(message);
  },
);

export default api;
