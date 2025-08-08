import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsNumber()
	@IsNotEmpty()
	userId: number

	@IsNumber()
	@IsNotEmpty()
	postId: number
}
