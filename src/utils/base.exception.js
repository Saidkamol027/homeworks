export class BaseException extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
	}
}
