import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from '../categorys/entities/category.entity'
import { User, UserSchema } from '../users/entities/user.entity'
import { Post, PostSchema } from './entities/post.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Category.name, schema: CategorySchema },
		]),
	],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
