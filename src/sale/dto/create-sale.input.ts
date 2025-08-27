// src/sale/dto/create-sale.input.ts
import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateSaleInput {
	@Field(() => Float)
	amount: number

	@Field(() => Int)
	productId: number
}
