import api from "../api/axios";

// Obtener todas las habitaciones
export const getRooms = () => {
  return api.get("/rooms");
};

// Obtener una habitacion por ID
export const getRoomById = (id) => {
  return api.get(`/rooms/${id}`);
};

export const getRoomById = (id) => {
  return axios.get(`/api/rooms/${id}`);
};
