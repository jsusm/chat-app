import { z } from "zod";

const id = z.coerce.number().gt(0).int()

export const paginationSchema = z.object({
  before: z.coerce.number().gt(0).int()
}).partial()

export const createMessageSchema = z.object({
  content: z.string(),
})

export const findMessagesSchema = z.object({
  chatId: id
})
