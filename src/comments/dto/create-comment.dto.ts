import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsMongoId()
	@IsNotEmpty()
	userId: string

	@IsMongoId()
	@IsNotEmpty()
	postId: string
}
