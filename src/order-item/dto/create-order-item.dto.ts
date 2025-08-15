import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class CreateOrderItemDto {
	@IsNumber()
	@IsNotEmpty()
	orderId: number

	@IsNumber()
	@IsNotEmpty()
	productId: number

	@IsNumber()
	@IsPositive()
	quantity: number
}
