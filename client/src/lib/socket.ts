import * as io from 'socket.io-client'
import { RawMessage } from '../services/messages'
import { ChatInstance } from '../services/chats'

export const baseServerUrl = 'http://localhost:8080'

interface ServerToClientEvents {
  'message:push': (msg: RawMessage, chatId: number) => void
  'chat:push': (chat: ChatInstance) => void
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
