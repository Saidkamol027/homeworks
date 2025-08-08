export const successResponse = (data: any, statusCode = 200) => {
	return {
		statusCode,
		message: 'success',
		data,
	}
}
