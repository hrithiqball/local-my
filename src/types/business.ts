import { z } from 'zod'

import { BusinessListSchema, BusinessSchema, CreateBusinessSchema } from '@/validation/business'

export type Business = z.infer<typeof BusinessSchema>
export type BusinessList = z.infer<typeof BusinessListSchema>
export type CreateBusiness = z.infer<typeof CreateBusinessSchema>
