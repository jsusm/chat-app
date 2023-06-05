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

export interface Chat {
  id: number;
  subId: number;
  member: {
    id: number;
    name: string;
  };
}

namespace WebSocket {
  interface ServerToClientEvents {
    'message:push': (msg: Message, chatId: number) => void
    'chat:push': (chat: Chat) => void
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
