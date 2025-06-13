export const successRes = (res, code = 200, message = 'success', data = []) => {
	return res.status(code).json({
		message,
		data,
	})
}
