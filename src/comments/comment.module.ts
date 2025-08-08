import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { Comment } from './entities/comment.entity'

@Module({
	imports: [SequelizeModule.forFeature([Comment])],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}
