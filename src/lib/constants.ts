const headers = new Headers()
headers.append('Content-Type', 'application/json')

export const REQUEST_URL = import.meta.env.VITE_REQUEST_URL as string
export const HEADERS = headers
