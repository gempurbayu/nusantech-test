import axios from "axios"

const baseURL = import.meta.env.VITE_TMDB_API_BASE_URL || "https://api.themoviedb.org/3"
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  },
  params: {
    ...(!accessToken && apiKey ? { api_key: apiKey } : {}),
  },
})

// Request interceptor for logging or dynamic token injection
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor for centralized error formatting
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error handling
    const message =
      error.response?.data?.status_message ||
      error.message ||
      "An unexpected error occurred"
    return Promise.reject(new Error(message))
  }
)
