import { Server } from "socket.io";
import { WebSocket } from "./types.js";
import * as http from 'http'
import { verifyJWT } from "./lib/jwt.js";

export class WS {
  public static instance: WS
  public io: WebSocket.Server

  constructor(httpServer: http.Server) {
    WS.instance = this
    this.io = new Server(httpServer, {
      cors: {
        origin: ['http://localhost:5731', 'http://localhost:3000']
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
          socket.join(`user-${user.id}`)
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
