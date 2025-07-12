import axios from "axios";

const API = axios.create({
  baseURL: "https://api.rewear.com", // Replace with actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;