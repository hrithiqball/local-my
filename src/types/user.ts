import { z } from 'zod'

import { UserSchema } from '@/validation/user'

export type User = z.infer<typeof UserSchema>
