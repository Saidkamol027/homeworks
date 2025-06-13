import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
	{
		passengerName: { type: String, required: true },
		seatNumber: { type: Number, required: true },
		transport: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Transport',
			required: true,
		},
	},
	{ timestamps: true, versionKey: false, collection: 'ticket' }
)

export const Ticket = mongoose.model('Ticket', ticketSchema)
