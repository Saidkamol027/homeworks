import { isValidObjectId } from 'mongoose'
import { BaseException } from './base.exception.js'

function checkValidObjectId(id) {
	if (!isValidObjectId(id)) {
		throw new BaseException("ID ma'lumot turi noto'g'ri", 400)
	}
}

export { checkValidObjectId }
