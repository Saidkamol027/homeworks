import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoryModule } from './categorys/category.module'
import { Category } from './categorys/entities/category.entity'
import { CommentModule } from './comments/comment.module'
import { Comment } from './comments/entities/comment.entity'
import { Post } from './posts/entities/post.entity'
import { PostModule } from './posts/post.module'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: String(process.env.DB_HOST),
			port: Number(process.env.DB_PORT),
			username: String(process.env.DB_USER),
			password: String(process.env.DB_PASS),
			database: String(process.env.DB_NAME),
			logging: false,
			synchronize: true,
			autoLoadModels: true,
			models: [User, Post, Category, Comment],
		}),
		UsersModule,
		PostModule,
		CommentModule,
		CategoryModule,
	],
})
export class AppModule {}
