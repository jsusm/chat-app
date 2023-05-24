import { Router, Request, Response, NextFunction } from 'express'
import { signupSchema } from '../schemas/auth.schema.js'
import bcrypt from 'bcrypt'
import { db } from '../db/db.js'
import { users } from '../db/schema.js'
import { SqliteError } from 'better-sqlite3'
import { signJWT } from '../lib/jwt.js'

const router = Router()

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = signupSchema.parse(req.body)
    const passwordHash = await bcrypt.hash(body.password, 8)

    let newUser: { name: string; id: number }
    try {
      newUser = db
        .insert(users)
        .values({ name: body.name, password: passwordHash })
        .returning({ name: users.name, id: users.id })
        .get()
    } catch (error) {
      if (error instanceof SqliteError) {
        res.status(400)
        res.json({
          message: "Username already taken"
        })
        return
      }
      throw error
    }
    const token = await signJWT(newUser)
    res.status(201)
    res.json({
      token,
      user: newUser,
    })
  }
  catch (error) {
    next(error)
  }
})

export default router
