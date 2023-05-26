import { Router } from 'express'
import authRouter from './auth.router.js'
import chatsRouter from './chats.router.js'

const router = Router()

// register all routers here
router.use('/auth', authRouter)
router.use('/chats', chatsRouter)

export default router
