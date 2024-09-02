import { BASE_API_URL } from '@/lib/constants'
import axios from 'axios'
import { z } from 'zod'

const api = axios.create({
  baseURL: BASE_API_URL
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export function handleError(error: unknown): never {
  if (error instanceof z.ZodError) {
    console.error(1, error.errors)
    throw new Error('Schema validation error: ' + JSON.stringify(error.errors))
  }

  if (axios.isAxiosError(error)) {
    console.error(2, error.response?.data)
    throw new Error(error.response?.data || 'An unknown error occurred. Please try again.')
  }

  console.error(3, error)
  throw error
}

export default api
