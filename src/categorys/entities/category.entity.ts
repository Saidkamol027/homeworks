import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CategoryDocument = Category & Document

@Schema({ timestamps: true })
export class Category {
	@Prop({ required: true, unique: true })
	name: string

	@Prop({ type: String, required: false })
	icon?: string

	@Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
	posts: Types.ObjectId[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
