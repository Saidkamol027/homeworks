import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		name: { type: String },
		color: { type: String },
	},
	{ versionKey: false, collection: 'product' }
)

const Product = new mongoose.model('Product', productSchema)

export { Product }
