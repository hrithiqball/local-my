import { HEADERS, REQUEST_URL } from '@/lib/constants'

export async function getCurrentUser(userId: string) {
  try {
    const response = await fetch(`${REQUEST_URL}/user/${userId}`, {
      method: 'GET',
      headers: HEADERS
    })

    const data = await response.json()
    if (response.ok && data) {
      return data
    } else {
      throw new Error('An unknown error occurred. Please try again.')
    }
  } catch (error) {
    throw error
  }
}

export async function login(body: string) {
  try {
    const response = await fetch(`${REQUEST_URL}/auth/login`, {
      method: 'POST',
      headers: HEADERS,
      body
    })

    const data = await response.json()
    if (response.ok && data.token) {
      return data.token
    } else if (data.error) {
      throw new Error(data.error)
    } else {
      throw new Error('Unexpected response')
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error('An unknown error occurred. Please try again.')
  }
}
