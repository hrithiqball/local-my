import { CreateProductSchema, ProductSchema } from '@/validation/product'
import { z } from 'zod'
import { BaseFilter } from './filter'

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>

export class ProductFilter extends BaseFilter {
  keyword?: string

  constructor(
    q?: string,
    page?: number,
    size?: number,
    offset?: number,
    sort?: 'asc' | 'desc',
    keyword?: string
  ) {
    super(q, page, size, offset, sort)
    this.keyword = keyword
  }

  toQueryString(): string {
    const params = new URLSearchParams(super.toQueryString())
    if (this.keyword) params.append('keyword', this.keyword)
    return params.toString()
  }
}
