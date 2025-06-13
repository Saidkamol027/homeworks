import { model, Schema } from 'mongoose'

const transportSchema = new Schema(
	{
		name: { type: String, required: true },
		type: { type: String, enum: ['bus', 'train', 'plane'], required: true },
		seats: { type: Number, required: true, min: 1 },
	},
	{ timestamps: true, versionKey: false, collection: 'transport' }
)

export const Transport = model('Transport', transportSchema)
