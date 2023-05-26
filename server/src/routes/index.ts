import { Router } from 'express'
import authRouter from './auth.router.js'
import chatsRouter from './chats.router.js'
import messagesRouter from './messages.router.js'

const router = Router()

// register all routers here
router.use('/auth', authRouter)
router.use('/chats', chatsRouter)
router.use('/messages', messagesRouter)

export default router
