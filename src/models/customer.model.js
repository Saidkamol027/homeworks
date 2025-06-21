import { model, Schema } from 'mongoose'

const CustomerSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isVerified: { type: Boolean, required: false },
	},
	{ timestamps: true, versionKey: false, collection: 'customer' }
)

export const Customer = model('Customer', CustomerSchema)
