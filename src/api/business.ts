import { HEADERS, REQUEST_URL } from '@/lib/constants'

export async function getCurrentUserBusiness(userId: string) {
  try {
    const response = await fetch(`${REQUEST_URL}/user/business/${userId}`, {
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
