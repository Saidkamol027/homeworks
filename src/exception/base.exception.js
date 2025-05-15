export class BaseException extends Error {
	constructor(message, status) {
		super(status)
		this.status = status
	}
}
