import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		count: { type: Number, required: true },
	},
	{ timestamps: true, versionKey: false }
)

const Porduct = mongoose.model('Products', productSchema)

export default Porduct
