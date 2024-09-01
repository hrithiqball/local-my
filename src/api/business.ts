import api, { handleError } from '@/lib/axios'
import { BusinessListSchema, BusinessSchema } from '@/validation/business'

export async function createBusiness(formData: FormData) {
  try {
    const response = await api.post('/business', formData)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

export async function getBusiness(businessId: string) {
  try {
    const response = await api.get(`/business/${businessId}`)
    return BusinessSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function getCurrentUserBusiness(userId: string) {
  try {
    const response = await api.get(`/user/business/${userId}`)
    return BusinessListSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function deleteBusiness(businessId: string) {
  try {
    const response = await api.delete(`/business/${businessId}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}
