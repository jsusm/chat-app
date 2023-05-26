import { z } from 'zod'

export const createChatSchema = z.object({
  coupleName: z.string().max(30)
})
