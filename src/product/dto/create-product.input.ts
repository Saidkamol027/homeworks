// src/product/dto/create-product.input.ts
import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateProductInput {
	@Field()
	name: string

	@Field(() => Float)
	price: number

	@Field(() => Int)
	categoryId: number
}
