import { Router, Request, Response, NextFunction } from 'express'
import { signinSchema, signupSchema } from '../schemas/auth.schema.js'
import bcrypt from 'bcrypt'
import { db } from '../db/db.js'
import { users } from '../db/schema.js'
import { SqliteError } from 'better-sqlite3'
import { signJWT } from '../lib/jwt.js'
import { eq } from 'drizzle-orm'

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

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = signinSchema.parse(req.body)
    const [user] = db
      .select()
      .from(users)
      .where(eq(users.name, body.name))
      .all()
    if (!user) {
      res.status(400)
      res.json({ message: "Username and password don't match" })
      return
    }
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      res.status(400)
      res.json({ message: "Username and password don't match" })
      return
    }
    const token = await signJWT(user)
    res.status(200)
    res.json({
      token,
      user: { id: user.id, name: user.name },
    })
  }
  catch (error) {
    next(error)
  }
})

export default router
