import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Post, PostSchema } from '../posts/entities/post.entity'
import { User, UserSchema } from '../users/entities/user.entity'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { Comment, CommentSchema } from './entities/comment.entity'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Comment.name, schema: CommentSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
