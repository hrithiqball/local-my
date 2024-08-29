import { HEADERS, REQUEST_URL } from '@/lib/constants'
import { BusinessListSchema } from '@/validation/business'
import { z } from 'zod'

export async function createBusiness(formData: FormData) {
  try {
    if (!localStorage.getItem('token')) {
      throw new Error('Unauthorized')
    }

    const headers = new Headers()
    headers.append('Authorization', localStorage.getItem('token')!)

    const response = await fetch(`${REQUEST_URL}/business`, {
      method: 'POST',
      headers,
      body: formData
    })

    if (!response.ok) {
      console.error(response)
      const text = await response.text()
      if (text) throw new Error(text)

      throw new Error('An unknown error occurred. Please try again.')
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Schema validation error ' + error.errors)
    }

    console.error(error)
    throw error
  }
}

export async function getCurrentUserBusiness(userId: string) {
  try {
    const response = await fetch(`${REQUEST_URL}/user/business/${userId}`, {
      method: 'GET',
      headers: HEADERS
    })

    if (!response.ok) {
      throw new Error('An unknown error occurred. Please try again.')
    }

    const responseData = await response.json()
    const business = BusinessListSchema.parse(responseData)

    return business
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error('Schema validation error ' + error.errors)
    }

    throw error
  }
}
