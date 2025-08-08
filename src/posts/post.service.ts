import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { Category } from '../categorys/entities/category.entity'
import { User } from '../users/entities/user.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {
	constructor(@InjectModel(Post) private readonly postModel: typeof Post) {}

	async create(createPostDto: CreatePostDto) {
		try {
			console.log('Creating post with data:', createPostDto)

			// Check if user exists
			const user = await User.findByPk(createPostDto.userId)
			if (!user) {
				throw new Error(`User with id ${createPostDto.userId} not found`)
			}

			// Check if category exists
			const category = await Category.findByPk(createPostDto.categoryId)
			if (!category) {
				throw new Error(`Category with id ${createPostDto.categoryId} not found`)
			}

			const newPost = await this.postModel.create({ ...createPostDto })
			console.log('New post created:', newPost.toJSON())

			const postWithRelations = await this.postModel.findByPk(newPost.id, {
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Category, attributes: ['id', 'name'] },
				],
			})

			if (!postWithRelations) {
				throw new Error('Failed to create post')
			}

			console.log('Post with relations:', postWithRelations.toJSON())
			return successResponse(postWithRelations, 201)
		} catch (error) {
			console.error('Error in create post:', error)
			handleError(error)
		}
	}

	async findAll() {
		try {
			const posts = await this.postModel.findAll({
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Category, attributes: ['id', 'name'] },
				],
			})
			return successResponse(posts, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: number) {
		try {
			const post = await this.postModel.findByPk(id, {
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Category, attributes: ['id', 'name'] },
				],
			})

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			return successResponse(post)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: number, updatePostDto: UpdatePostDto) {
		try {
			const post = await this.postModel.findByPk(id)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			await this.postModel.update(updatePostDto, { where: { id } })
			const updatedPost = await this.postModel.findByPk(id, {
				include: [
					{ model: User, attributes: ['id', 'name', 'phone'] },
					{ model: Category, attributes: ['id', 'name'] },
				],
			})

			if (!updatedPost) {
				throw new Error('Failed to update post')
			}

			return successResponse(updatedPost)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: number) {
		try {
			const post = await this.postModel.findByPk(id)

			if (!post) {
				throw new NotFoundException('Post not found')
			}

			await this.postModel.destroy({ where: { id } })
			return successResponse({ message: 'Post deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
