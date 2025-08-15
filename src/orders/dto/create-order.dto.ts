import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator'

export class CreateOrderItemDto {
	@IsNumber()
	@IsNotEmpty()
	productId: number

	@IsNumber()
	@IsNotEmpty()
	quantity: number
}

export class CreateOrderDto {
	@IsNumber()
	@IsNotEmpty()
	userId: number

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderItemDto)
	orderItems: CreateOrderItemDto[]
}
