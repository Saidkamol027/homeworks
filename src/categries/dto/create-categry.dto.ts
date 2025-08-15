import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategryDto {
	@IsString()
	@IsNotEmpty()
	name: string
}
