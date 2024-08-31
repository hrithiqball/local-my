const headers = new Headers()
headers.append('Content-Type', 'application/json')

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string
export const HEADERS = headers
