import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category, CategoryDocument } from './entities/category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<CategoryDocument>
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		try {
			const { name } = createCategoryDto
			const existsCategory = await this.categoryModel.findOne({ name })

			if (existsCategory) {
				throw new ConflictException('Category name already exists')
			}

			const newCategory = await this.categoryModel.create({
				...createCategoryDto,
			})
			return successResponse(newCategory, 201)
		} catch (error) {
			handleError(error)
		}
	}

	async findAll() {
		try {
			const categories = await this.categoryModel.find().exec()
			return successResponse(categories, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: string) {
		try {
			const category = await this.categoryModel.findById(id).exec()

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			return successResponse(category)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: string, updateCategoryDto: UpdateCategoryDto) {
		try {
			const { name } = updateCategoryDto

			if (name) {
				const existsCategory = await this.categoryModel.findOne({
					name,
					_id: { $ne: id },
				})
				if (existsCategory) {
					throw new ConflictException('Category name already exists')
				}
			}

			const category = await this.categoryModel.findByIdAndUpdate(
				id,
				updateCategoryDto,
				{ new: true }
			)

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			return successResponse(category)
		} catch (error) {
			handleError(error)
		}
	}

	async uploadIcon(id: string, iconPath: string) {
		try {
			const category = await this.categoryModel.findByIdAndUpdate(
				id,
				{ icon: iconPath },
				{ new: true }
			)

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			return successResponse(category)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: string) {
		try {
			const category = await this.categoryModel.findByIdAndDelete(id)

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			return successResponse({ message: 'Category deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
