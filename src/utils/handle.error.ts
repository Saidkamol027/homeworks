import { HttpException, HttpStatus } from '@nestjs/common'

export const handleError = (error: any) => {
	console.error('Error:', error)

	if (error instanceof HttpException) {
		throw error
	}

	const status = error.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
	const message =
		error.response?.message || error.message || 'Internal server error'

	throw new HttpException(message, status)
}
