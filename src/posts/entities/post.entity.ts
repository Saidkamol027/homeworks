import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	content: string

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	userId: Types.ObjectId

	@Prop({ type: Types.ObjectId, ref: 'Category', required: true })
	categoryId: Types.ObjectId

	@Prop({ type: [String], required: false })
	images?: string[]

	@Prop({ type: String, required: false })
	video?: string

	@Prop({ type: String, required: false })
	document?: string

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
	comments: Types.ObjectId[]
}

export const PostSchema = SchemaFactory.createForClass(Post)
