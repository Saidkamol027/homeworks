import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: String, required: true },
	},
	{ versionKey: false, collection: 'product' }
)

const Product = new mongoose.model('Product', productSchema)

export { Product }
