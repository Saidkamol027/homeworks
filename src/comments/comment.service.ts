import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { Post } from '../posts/entities/post.entity'
import { User } from '../users/entities/user.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment) private readonly commentModel: typeof Comment
	) {}

	async create(createCommentDto: CreateCommentDto) {
		try {
			const newComment = await this.commentModel.create({ ...createCommentDto })
			const commentWithRelations = await this.commentModel.findByPk(
				newComment.id,
				{
					include: [
						{ model: User, attributes: ['id', 'name', 'phone'] },
						{ model: Post, attributes: ['id', 'title'] },
					],
				}
			)

			if (!commentWithRelations) {
				throw new Error('Failed to create comment')
			}

			return successResponse(commentWithRelations, 201)
		} catch (error) {
			handleError(error)
		}
	}

	async findAll() {
		try {
			const comments = await this.commentModel.findAll({
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Post, attributes: ['id', 'title'] },
				],
			})
			return successResponse(comments, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: number) {
		try {
			const comment = await this.commentModel.findByPk(id, {
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Post, attributes: ['id', 'title'] },
				],
			})

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			return successResponse(comment)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: number, updateCommentDto: UpdateCommentDto) {
		try {
			const comment = await this.commentModel.findByPk(id)

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			await this.commentModel.update(updateCommentDto, { where: { id } })
			const updatedComment = await this.commentModel.findByPk(id, {
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Post, attributes: ['id', 'title'] },
				],
			})

			if (!updatedComment) {
				throw new Error('Failed to update comment')
			}

			return successResponse(updatedComment)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: number) {
		try {
			const comment = await this.commentModel.findByPk(id)

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			await this.commentModel.destroy({ where: { id } })
			return successResponse({ message: 'Comment deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
