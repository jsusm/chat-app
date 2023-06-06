import { Server } from "socket.io";
import { WebSocket } from "./types.js";
import * as http from 'http'
import { verifyJWT } from "./lib/jwt.js";
import { db } from "./db/db.js";
import { chatSubs } from "./db/schema.js";
import { eq } from "drizzle-orm";

export class WS {
  public static instance: WS
  public io: WebSocket.Server

  constructor(httpServer: http.Server) {
    WS.instance = this
    this.io = new Server(httpServer, {
      cors: {
        origin: ['http://localhost:4173', 'http://localhost:3000']
      }
    })
    // middlewares
    this.io.use((socket: WebSocket.Socket, next) => {
      const token = socket.handshake.auth.token
      if(typeof token !== 'string'){
        next(new Error('Invalid token.'))
        return
      }
      verifyJWT(token)
        .then(({user}) => {
          socket.data.user = user
          const subscription = db
            .select({
              chatId: chatSubs.chatId
            })
            .from(chatSubs)
            .where(eq(chatSubs.userId, user.id))
            .all()
          socket.join(`user-${user.id}`)
          subscription.forEach((s) => {
            socket.join(`chat-${s.chatId}`)
          })
          console.log('socketRooms:', socket.rooms)
          next()
        })
        .catch(() => {
          next(new Error('Invalid token.'))
          return
        })
    })
  }
  public static getInstace(): WS {
    if(!WS.instance) {
      throw new Error("Instance is not created")
    }
    return this.instance
  }
}
