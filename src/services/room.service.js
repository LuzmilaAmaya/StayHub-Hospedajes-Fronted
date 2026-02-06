import api from "../api/room.api";

export const getRooms = () => api.get("/rooms");
export const getRoomById = (id) => api.get(`/rooms/${id}`);
export const createRoom = (data) => api.post("/rooms", data);
