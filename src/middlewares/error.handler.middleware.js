export const errorHandlerMiddleware = (err, req, res, next) => {
	let status = err.status || 500
	let message = err.message || 'Server bilan muammo'
	res.status(status).json({ success: false, message: message })
}
