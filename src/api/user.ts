/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HEADERS, BASE_API_URL } from '@/lib/constants'
import { UserSchema } from '@/validation/user'

export async function getCurrentUser(userId: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${BASE_API_URL}/user/${userId}`, {
      method: 'GET',
      headers: HEADERS
    })

    if (!response.ok) {
      console.error(response)
      const text = await response.text()
      if (text) throw new Error(text)

      throw new Error('An unknown error occurred. Please try again.')
    }

    const responseData: unknown = await response.json()
    const user = UserSchema.parse(responseData)

    return user
  } catch (error) {
    throw error
  }
}

export async function login(body: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/login`, {
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
