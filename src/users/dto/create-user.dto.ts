import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsEmail()
	email: string

	@MinLength(6)
	password: string
}
