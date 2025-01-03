import axios from 'axios'
import { localStorageKeys } from 'config/localStorageKeys'

export const basicClient = axios.create()

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const api = axios.create({
  baseURL: 'https://localhost:9000',
})

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})