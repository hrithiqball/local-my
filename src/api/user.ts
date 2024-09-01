import api, { handleError } from '@/lib/axios'
import { LoginSchema } from '@/validation/auth'
import { UserSchema } from '@/validation/user'

export async function getCurrentUser(userId: string) {
  try {
    const response = await api.get(`/user/${userId}`)
    return UserSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function login(body: string) {
  try {
    const response = await api.post(`/auth/login`, body)
    const data = LoginSchema.parse(response.data)

    if (data.token) {
      return data.token
    }

    throw new Error(data.error || 'Unexpected error')
  } catch (error) {
    handleError(error)
  }
}
