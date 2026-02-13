import api from "../api/axios";

// Obtener todos los usuarios
export const getUsers = () => {
  return api.get("/users");
};

// Obtener usuario por ID
export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

// Actualizar usuario
export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data);
};

// Eliminar usuario
export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
