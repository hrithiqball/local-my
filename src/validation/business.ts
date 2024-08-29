import { z } from 'zod'

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  // description: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string().optional(),
  // website: z.string().url().optional()
  coverPhoto: z.string().optional(),
  profilePhoto: z.string().optional()
})

export const BusinessListSchema = z.array(BusinessSchema)

export const CreateBusinessSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10).optional(),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(10).optional(),
  website: z.string().url().optional(),
  coverPhoto: z.string().optional(),
  profilePhoto: z.string().optional()
})
