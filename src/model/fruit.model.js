import mongoose from 'mongoose'

const fruitSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
	},
	{ versionKey: false, collection: 'fruit' }
)

const Fruit = new mongoose.model('Fruit', fruitSchema)

export { Fruit }
