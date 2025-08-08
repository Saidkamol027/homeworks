import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name: string

	@Prop({ required: true, unique: true })
	phone: string

	@Prop({ required: true })
	age: number

	@Prop({ type: String, required: false })
	avatar?: string

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
	posts: Types.ObjectId[]

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
	comments: Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
