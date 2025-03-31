export const ErrorHandlerMiddleware = (err, _, res, __) => {
	if (err.isException) {
		return res.status(err.status).json({ message: err.message })
	}
	console.log(err)
	res.status(500).json({ message: 'Server bilan muammo' })
}

