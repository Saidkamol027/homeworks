import { model, Schema } from 'mongoose'

const AdminSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isActive: { type: String, required: true },
		role: {
			type: String,
			enum: ['Admin', 'SuperAdmin'],
			required: true,
			default: 'Admin',
		},
		image: { type: String, required: true },
	},
	{ timestamps: true, collection: 'admin', versionKey: false }
)

const Admin = model('Admin', AdminSchema)

export { Admin }
