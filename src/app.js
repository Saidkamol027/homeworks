import express from 'express'
import { BaseException } from './exception/base.exception.js'
import { ErrorHandlerMiddleware } from './middleware/erro.handler.middleware.js'
import router from './route/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.all('/*', (req, res, next) => {
	try {
		throw new BaseException(
			`Given ${req.url} with method ${req.method} not found`,
			404
		)
	} catch (error) {
		next(error)
	}
})

app.use(ErrorHandlerMiddleware)

export default app
