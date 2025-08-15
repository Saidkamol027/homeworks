import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from 'class-validator'

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@IsPositive()
	price: number

	@IsNumber()
	@IsOptional()
	categoriesId?: number
}
