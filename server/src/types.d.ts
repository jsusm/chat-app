import * as io from 'socket.io'

export interface User {
  id: number;
  name: string;
}

namespace WebSocket {
  interface ServerToClientEvents {
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
