import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { Post } from '../posts/entities/post.entity'
import { User } from '../users/entities/user.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment, CommentDocument } from './entities/comment.entity'

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name)
		private readonly commentModel: Model<CommentDocument>,
		@InjectModel(User.name) private readonly userModel: Model<any>,
		@InjectModel(Post.name) private readonly postModel: Model<any>
	) {}

	async create(createCommentDto: CreateCommentDto) {
		try {
			const user = await this.userModel.findById(createCommentDto.userId)
			if (!user) {
				throw new Error(`User with id ${createCommentDto.userId} not found`)
			}

			const post = await this.postModel.findById(createCommentDto.postId)
			if (!post) {
				throw new Error(`Post with id ${createCommentDto.postId} not found`)
			}

			const newComment = await this.commentModel.create({ ...createCommentDto })
			const commentWithRelations = await this.commentModel
				.findById(newComment._id)
				.populate('userId', 'name phone')
				.populate('postId', 'title')
				.exec()

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
			const comments = await this.commentModel
				.find()
				.populate('userId', 'name phone')
				.populate('postId', 'title')
				.exec()
			return successResponse(comments, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: string) {
		try {
			const comment = await this.commentModel
				.findById(id)
				.populate('userId', 'name phone')
				.populate('postId', 'title')
				.exec()

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			return successResponse(comment)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: string, updateCommentDto: UpdateCommentDto) {
		try {
			const comment = await this.commentModel.findById(id)

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			const updatedComment = await this.commentModel
				.findByIdAndUpdate(id, updateCommentDto, { new: true })
				.populate('userId', 'name phone')
				.populate('postId', 'title')
				.exec()

			if (!updatedComment) {
				throw new Error('Failed to update comment')
			}

			return successResponse(updatedComment)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadAttachments(id: string, attachmentPaths: string[]) {
		try {
			const comment = await this.commentModel.findByIdAndUpdate(
				id,
				{ $push: { attachments: { $each: attachmentPaths } } },
				{ new: true }
			)

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			return successResponse(comment)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: string) {
		try {
			const comment = await this.commentModel.findByIdAndDelete(id)

			if (!comment) {
				throw new NotFoundException('Comment not found')
			}

			return successResponse({ message: 'Comment deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
