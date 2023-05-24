import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string().min(8)
})

export const signinSchema = z.object({
  name: z.string(),
  password: z.string(),
})
