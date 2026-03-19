import api from "../api/axios.js";

export const getRooms = () => {
  return api.get("/rooms");
};

export const getRoomById = (id) => {
  return api.get(`/rooms/${id}`);
};

 feat/rooms
export const createRoom = (roomData) => {
  return api.post("/rooms", roomData);
};

export const updateRoom = (id, roomData) => {
  return api.put(`/rooms/${id}`, roomData);
};

export const deleteRoom = (id) => {
  return api.delete(`/rooms/${id}`);
};

export const getRoomById = (id) => {
  return axios.get(`/api/rooms/${id}`);
};

