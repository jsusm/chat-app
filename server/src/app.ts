import bodyParser from 'body-parser'
import cors from 'cors'
import * as express from 'express'
import routes from './routes/index.js'

const app = express.default()

app.use(bodyParser.json())
app.use(cors({
  origin: ['http://localhost:1573'],
}))

app.use('/api', routes)

export default app
