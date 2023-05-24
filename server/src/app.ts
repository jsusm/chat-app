import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import * as express from 'express'
import routes from './routes/index.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const app = express.default()

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
  origin: ['http://localhost:1573'],
}))
app.use(errorMiddleware)

app.use('/api', routes)

export default app
