import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { InferModel } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  password: text('password').notNull()
}, (users) => ({
  nameIdx: uniqueIndex('nameIdx').on(users.name)
}))

export const chats = sqliteTable('chats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
})

export const chatSubs = sqliteTable('chat_subscriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  chatId: integer('chat_id').notNull().references(() => chats.id),
  userId: integer('author_id').notNull().references(() => users.id),
})

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  chatSubId: integer('chat_sub_id').notNull().references(() => chatSubs.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  content: text('content').notNull(),
})

export type UserDB = InferModel<typeof users>
export type ChatDB = InferModel<typeof chats>
export type ChatSub = InferModel<typeof chatSubs>
export type MessageDB = InferModel<typeof messages>
