import { z } from 'zod'

export const LoginSchema = z.object({
  token: z.string().optional(),
  error: z.string().optional()
})
