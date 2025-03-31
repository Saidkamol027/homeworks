import { isValidObjectId } from 'mongoose'

export const checkObjectId = (res, id) => {
	if (!isValidObjectId(id)) {
		return res
			.status(404)
			.json({ message: "Bunday ID yaroqsiz yoki noto'g'ri" })
	}
	return true
}

export const handlerServerError = (error, res) => {
	console.log(error)
	res.status(500).json({ message: 'Server bilan muammo' })
}
