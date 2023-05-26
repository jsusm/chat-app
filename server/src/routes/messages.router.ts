import { Router } from 'express'
import { createMessageSchema, findMessagesSchema, paginationSchema } from '../schemas/message.schema.js'
import { isAuth } from '../middlewares/auth.middleware.js'
import { db } from '../db/db.js'
import { chatSubs, chats, messages, users } from '../db/schema.js'
import { and, desc, eq, lt } from 'drizzle-orm'

const router = Router()

router.post('/:chatId', isAuth, (req, res, next) => {
  try {
    const params = findMessagesSchema.parse(req.params)
    const body = createMessageSchema.parse(req.body)
    const [sub] = db
      .select({ id: chatSubs.id })
      .from(chatSubs)
      .where(and(eq(chatSubs.userId, req.user.id), eq(chatSubs.chatId, params.chatId)))
      .all()
    if(!sub) {
      res.status(400)
      res.json({
        message: 'This chat does not exits',
      })
      return
    }
    const message = db
      .insert(messages)
      .values({ content: body.content, chatSubId: sub.id, createdAt: new Date() })
      .returning()
      .get()
    res.status(201)
    res.json(message)
  } catch (error) {
    next(error)
  }
})

router.get('/:chatId', isAuth, (req, res, next) => {
  try {
    const params = findMessagesSchema.parse(req.params)
    const pagination = paginationSchema.parse(req.query)
    const messageList = db
      .select({
        id: messages.id,
        content: messages.content,
        createdAt: messages.createdAt,
        userId: users.id,
      })
      .from(chats)
      .leftJoin(chatSubs, eq(chatSubs.chatId, chats.id))
      .leftJoin(users, eq(chatSubs.userId, users.id))
      .leftJoin(messages, eq(messages.chatSubId, chatSubs.id))
      .orderBy(desc(messages.createdAt))
      .where(
        and(
          eq(chats.id, params.chatId),
          lt(messages.createdAt, new Date(pagination.before ?? Date.now())),
          eq(users.id, req.user.id)
        )
      )
      .limit(20)
      .all()

    res.status(201)
    res.json(messageList)
  } catch (error) {
    next(error)
  }
})

export default router
