import api from "../api/axios";

export const createReservation = (data) => api.post("/reservations", data);

export const getReservations = () => api.get("/reservations");

export const getMyReservations = () => api.get("/reservations/my");

export const getReservationById = (id) => api.get(`/reservations/${id}`);

export const cancelReservation = (id) =>
  api.patch(`/reservations/${id}/cancel`);