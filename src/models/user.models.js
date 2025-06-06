import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, minLength: 8 },
		role: {
			type: String,
			enum: ['admin', 'user', 'superAdmin'],
			default: 'user',
		},
	},
	{ timestamps: true, collection: 'user', versionKey: false }
)

const User = model('User', UserSchema)

export { User }
