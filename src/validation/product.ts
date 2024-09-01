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

export const CreateProductSchema = ProductSchema.omit({ id: true })
