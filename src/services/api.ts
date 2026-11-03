import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: 'https://www.nexus.mindlabs.id/',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      // Redirect to login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)
