import api from "../api/axios";

export const getUsers = () => {
  return api.get("/users");
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
