import api from "../api/axios";


export const getAll = () => api.get("/reviews");


export const create = (data) => api.post("/reviews", data);


export const remove = (id) => api.delete(`/reviews/${id}`);