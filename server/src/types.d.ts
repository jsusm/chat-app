import * as io from 'socket.io'

export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number,
  authorId: number,
  content: string,
  createdAt: Date
}

namespace WebSocket {
  interface ServerToClientEvents {
    'message': (msg: Message, chatId: number) => void
  }

  interface ClientToServerEvents {
  }

  interface InterServerEvents {
  }

  interface SocketData {
    user: User
  }

  type Server = io.Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >

  type Socket = io.Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
}
