export const sendResponse = (
	res,
	code = 200,
	message = 'success',
	data = []
) => {
	res.status(code).json({ message: message, data: data })
}
