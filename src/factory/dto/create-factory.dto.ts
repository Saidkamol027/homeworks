import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateFactoryDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsInt()
	numberOfWorkers: number
}
