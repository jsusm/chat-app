import { Router } from 'express'
import authRouter from './auth.router.js'

const router = Router()

// register all routers here
router.use('/auth', authRouter)

export default router
