import * as io from 'socket.io-client'
import { RawMessage } from '../services/messages'

export const baseServerUrl = 'http://localhost:8080'

interface ServerToClientEvents {
  'message': (msg: RawMessage, chatId: number) => void
}

interface ClientToServerEvents {
}

type Socket = io.Socket<ServerToClientEvents, ClientToServerEvents>

export function connectSocket(token: string) {
  const socket: Socket = io.default(baseServerUrl, {
    auth: {
      token
    }
  })
  return socket
}
