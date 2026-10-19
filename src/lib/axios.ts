import axios from "axios"

const cleanEnv = (val?: string) => {
  if (!val) return undefined
  const cleaned = val.trim().replace(/^["']|["']$/g, "").trim()
  return cleaned || undefined
}

const baseURL =
  cleanEnv(import.meta.env.VITE_TMDB_API_BASE_URL) ||
  cleanEnv(import.meta.env.TMDB_API_BASE_URL) ||
  "https://api.themoviedb.org/3"

const apiKey =
  cleanEnv(import.meta.env.VITE_TMDB_API_KEY) ||
  cleanEnv(import.meta.env.TMDB_API_KEY) ||
  "c05b74e1d63ea2f9a325583c031a66fd"

const accessToken =
  cleanEnv(import.meta.env.VITE_TMDB_ACCESS_TOKEN) ||
  cleanEnv(import.meta.env.TMDB_ACCESS_TOKEN)

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor: ensure authentication is properly attached
axiosClient.interceptors.request.use(
  (config) => {
    // 1. If valid Bearer Access Token is present (pure ASCII), attach Authorization header
    const isValidBearer =
      accessToken &&
      typeof accessToken === "string" &&
      /^[\x20-\x7E]*$/.test(accessToken) &&
      accessToken.startsWith("eyJ")

    if (isValidBearer) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // 2. Attach API Key parameter (TMDB v3 standard parameter)
    if (apiKey) {
      config.params = {
        api_key: apiKey,
        ...config.params,
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for centralized error formatting
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      "An unexpected error occurred while communicating with TMDB"
    return Promise.reject(new Error(message))
  }
)
