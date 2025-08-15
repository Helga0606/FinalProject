import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TRAVEL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "apiKey": import.meta.env.VITE_TRAVEL_API_KEY
  }
});

export const getPromos = () => api.get("/api/v1/promos");
export const getBanners = () => api.get("/api/v1/banners"); 
export const getActivities = () => api.get("/api/v1/activities");
