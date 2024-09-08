import { z } from 'zod'

import { BaseFilter } from '@/types/filter'
import {
  CreateProductSchema,
  ProductListResponseSchema,
  ProductSchema,
  UpdateProductSchema
} from '@/validation/product'

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>
export type UpdateProductInput = {
  id: string
  formData: FormData
}
export class ProductFilter extends BaseFilter {
  keyword?: string
  businessId?: string

  constructor(
    q?: string,
    page?: number,
    size?: number,
    offset?: number,
    sort?: 'asc' | 'desc',
    keyword?: string,
    businessId?: string
  ) {
    super(q, page, size, offset, sort)
    this.keyword = keyword
    this.businessId = businessId
  }

  toQueryString(): string {
    const params = new URLSearchParams(super.toQueryString())
    if (this.keyword) params.append('keyword', this.keyword)
    if (this.businessId) params.append('businessId', this.businessId)
    return params.toString()
  }
}
