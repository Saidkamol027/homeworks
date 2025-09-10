import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEmployeeDto {
	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsString()
	@IsNotEmpty()
	lastName: string

	@IsString()
	@IsNotEmpty()
	position: string

	@IsNumber()
	salary: number

	@IsInt()
	factoryId: number
}
