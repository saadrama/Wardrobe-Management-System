import axios from "axios";
import api from "./api";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export default api;

export const clothingApi = {
  async getItems() {
    const response = await api.get("/clothing-items");
    return response.data;
  },

  async addItem(itemData) {
    const response = await api.post("/clothing-items", itemData);
    return response.data;
  },

  async updateItem(id, itemData) {
    const response = await api.put(`/clothing-items/${id}`, itemData);
    return response.data;
  },

  async deleteItem(id) {
    await api.delete(`/clothing-items/${id}`);
  },
};

