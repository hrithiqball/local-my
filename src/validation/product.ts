import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  type: z.string(),
  businessId: z.string()
})

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  type: z.string()
})
