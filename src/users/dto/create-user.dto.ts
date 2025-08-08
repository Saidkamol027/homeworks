import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsPhoneNumber('UZ')
	@IsNotEmpty()
	phone: string

	@IsNumber()
	@IsNotEmpty()
	age: number
}
