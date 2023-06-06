import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db/db.js'
import { chatSubs, chats, users } from '../db/schema.js'
import { isAuth } from '../middlewares/auth.middleware.js'
import { createChatSchema } from '../schemas/chat.schema.js'
import { eq, and, ne, or } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'
import { WS } from '../ws.js'

const router = Router()

const _sub = alias(chatSubs, "sub")

/** POST /api/chats
 * Creates a new chat
 */
router.post('/', isAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = createChatSchema.parse(req.body)
    const [couple] = db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.name, body.coupleName))
      .all()
    if (couple === undefined) {
      res.status(400)
      res.json({
        message: 'This user don\'t exists'
      })
      return
    }
    // check if a chat between couple and user is already created
    const relation = db
      .select({
        id: _sub.id,
      })
      .from(chatSubs)
      .innerJoin(chats, eq(chatSubs.chatId, chats.id))
      .innerJoin(_sub, eq(chats.id, _sub.chatId))
      .where(and(
        eq(chatSubs.userId, req.user.id),
        eq(_sub.userId, couple.id)
      ))
      .all()

    // Do not create any chat if already exists
    if (relation.length >= 1) {
      res.sendStatus(201)
      return
    }

    const chat = db
      .insert(chats)
      .values({ id: undefined })
      .returning({ id: chats.id })
      .get()

    db
      .insert(chatSubs)
      .values({ chatId: chat.id, userId: req.user.id })
      .run()

    const coupleSub = db
      .insert(chatSubs)
      .values({ chatId: chat.id, userId: couple.id })
      .returning({ id: chatSubs.id })
      .get()

    res.sendStatus(201)
    // subscribe chat's users to chat-{id} room
    WS.instance.io.in(`user-${req.user.id}`).socketsJoin(`chat-${chat.id}`)
    WS.instance.io.in(`user-${couple.id}`).socketsJoin(`chat-${chat.id}`)

    // notify chat creation
    WS.instance.io.in(`chat-${chat.id}`).emit('chat:push', { member: req.user, id: chat.id, subId: coupleSub.id })
  } catch (error) {
    next(error)
  }
})

/** GET /api/chats/
 * Returns user's chats
 */
router.get('/', isAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatList = db
      .select({
        id: chats.id,
        subId: _sub.id,
        member: {
          id: users.id,
          name: users.name,
        }
      })
      .from(chatSubs)
      .innerJoin(chats, eq(chatSubs.chatId, chats.id))
      .innerJoin(_sub, eq(chats.id, _sub.chatId))
      .innerJoin(users, eq(_sub.userId, users.id))
      .where(and(
        eq(chatSubs.userId, req.user.id),
        ne(users.id, req.user.id)
      ))
      .all()

    res.json(chatList)
  } catch (error) {
    next(error)
  }
})

export default router
