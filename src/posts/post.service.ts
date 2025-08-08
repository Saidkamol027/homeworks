import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { Category } from '../categorys/entities/category.entity'
import { User } from '../users/entities/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post, PostDocument } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
		@InjectModel(User.name) private readonly userModel: Model<any>,
		@InjectModel(Category.name) private readonly categoryModel: Model<any>
	) {}

	async create(createPostDto: CreatePostDto) {
		try {
			const user = await this.userModel.findById(createPostDto.userId)
			if (!user) {
				throw new Error(`User with id ${createPostDto.userId} not found`)
			}

			const category = await this.categoryModel.findById(
				createPostDto.categoryId
			)
			if (!category) {
				throw new Error(
					`Category with id ${createPostDto.categoryId} not found`
				)
			}

			const newPost = await this.postModel.create({ ...createPostDto })

			const postWithRelations = await this.postModel
				.findById(newPost._id)
				.populate('userId', 'name phone')
				.populate('categoryId', 'name')
				.exec()

			if (!postWithRelations) {
				throw new Error('Failed to create post')
			}

			return successResponse(postWithRelations, 201)
		} catch (error) {
			handleError(error)
		}
	}

	async findAll() {
		try {
			const posts = await this.postModel
				.find()
				.populate('userId', 'name phone')
				.populate('categoryId', 'name')
				.exec()
			return successResponse(posts, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: string) {
		try {
			const post = await this.postModel
				.findById(id)
				.populate('userId', 'name phone')
				.populate('categoryId', 'name')
				.exec()

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse(post)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: string, updatePostDto: UpdatePostDto) {
		try {
			const post = await this.postModel.findById(id)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			const updatedPost = await this.postModel
				.findByIdAndUpdate(id, updatePostDto, { new: true })
				.populate('userId', 'name phone')
				.populate('categoryId', 'name')
				.exec()

			if (!updatedPost) {
				throw new Error('Failed to update post')
			}

			return successResponse(updatedPost)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadImages(id: string, imagePaths: string[]) {
		try {
			const post = await this.postModel.findByIdAndUpdate(
				id,
				{ $push: { images: { $each: imagePaths } } },
				{ new: true }
			)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse(post)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadVideo(id: string, videoPath: string) {
		try {
			const post = await this.postModel.findByIdAndUpdate(
				id,
				{ video: videoPath },
				{ new: true }
			)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse(post)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadDocument(id: string, documentPath: string) {
		try {
			const post = await this.postModel.findByIdAndUpdate(
				id,
				{ document: documentPath },
				{ new: true }
			)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse(post)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: string) {
		try {
			const post = await this.postModel.findByIdAndDelete(id)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse({ message: 'Post deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
