import api from "../api/axios";

export const createPayment = (data) => {
  return api.post("/payments/create-payment", data);
};