import { createServer } from 'http'
import app from "./app.js";
import { WS } from './ws.js';

const PORT = parseInt(process.env.PORT ?? '8080')
const httpServer = createServer(app)
new WS(httpServer)

console.log(`Listen on port ${PORT}`)
httpServer.listen(PORT, "::")
