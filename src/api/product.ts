import api, { handleError } from '@/lib/axios'
import { ProductFilter } from '@/types/product'
import { ProductSchema } from '@/validation/product'
import { ResponseSchema } from '@/validation/response'

export async function createProduct(formData: FormData) {
  try {
    const response = await api.post('/product', formData)
    return ProductSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function getProductList(params: ProductFilter) {
  try {
    const response = await api.get(`/product?${params.toQueryString()}`)
    return ProductSchema.array().parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function getProduct(productId: string) {
  try {
    const response = await api.get(`/product/${productId}`)
    return ProductSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const response = await api.patch(`/product/${productId}`, formData)
    return ProductSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}

export async function deleteProduct(productId: string) {
  try {
    const response = await api.delete(`/product/${productId}`)
    return ResponseSchema.parse(response.data)
  } catch (error) {
    handleError(error)
  }
}
