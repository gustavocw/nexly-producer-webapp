import axios from "axios";
import { localStorageKeys } from "config/localStorageKeys";

export const basicClient = axios.create();

const apiUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEVELOPMENT
    : import.meta.env.VITE_API_URL_PRODUCTION;

export const http = axios.create({
  baseURL: apiUrl,
});

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});