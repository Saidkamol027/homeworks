import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		name: { type: mongoose.SchemaTypes.String, required: true },
		email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
		password: { type: mongoose.SchemaTypes.String, required: true },
		role: {
			type: mongoose.SchemaTypes.String,
			role: ['User', 'Admin'],
			default: 'User',
		},
	},
	{ timestamps: true }
)

export default mongoose.model('User', UserSchema)
