import { db } from './db/db.js'
import { users } from './db/schema.js'

console.log(db.select().from(users).all())
