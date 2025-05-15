import express from 'express'
import { ErrroHandlerMiddleware } from './middleware/error.middleware.js'
import { router } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(ErrroHandlerMiddleware)
export { app }
