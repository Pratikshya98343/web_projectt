import axios from "axios";
import { store } from "../redux/Store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Update the Authorization header with the latest access token on each request
  const { user } = store.getState();
  if (user.token) {
    config.headers.Authorization = `Bearer ${auth?.user}`;
  }
  return config;
});

export default api;
