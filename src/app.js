import cookieParser from 'cookie-parser'
import express from 'express'
import { errorHandlerMiddleware } from './middlewares/error.handler.middleware.js'
import { router } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(cookieParser())
app.use(errorHandlerMiddleware)

export { app }
