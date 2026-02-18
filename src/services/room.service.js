import axios from "axios";

export const getRooms = () => {
  return axios.get("/api/rooms");
};

export const getRoomById = (id) => {
  return axios.get(`/api/rooms/${id}`);
};
