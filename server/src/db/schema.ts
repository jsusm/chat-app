import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { InferModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  password: text('password').notNull()
}, (users) => ({
  nameIdx: uniqueIndex('nameIdx').on(users.name)
}))

export type UserDB = InferModel<typeof users>
