import { defineStore } from "pinia";
import api from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async register(userData) {
      await api.post("/register", userData);
    },

    async login(credentials) {
      const response = await api.post("/login", credentials);
      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem("token", this.token);
    },

    async fetchUser() {
      if (!this.token) return;
      const response = await api.get("/user", {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = response.data;
    },

    async logout() {
      await api.post("/logout", null, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
 
