import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { handleError } from 'src/utils/handle.error'
import { successResponse } from 'src/utils/success.response'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category) private readonly categoryModel: typeof Category
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		try {
			const { name } = createCategoryDto
			const existsCategory = await this.categoryModel.findOne({
				where: { name },
			})

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
			const categories = await this.categoryModel.findAll()
			return successResponse(categories, 200)
		} catch (error) {
			handleError(error)
		}
	}

	async findOne(id: number) {
		try {
			const category = await this.categoryModel.findByPk(id)

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			return successResponse(category)
		} catch (error) {
			handleError(error)
		}
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		try {
			const { name } = updateCategoryDto

			if (name) {
				const existsCategory = await this.categoryModel.findOne({
					where: { name },
				})
				if (existsCategory && existsCategory.id !== id) {
					throw new ConflictException('Category name already exists')
				}
			}

			const category = await this.categoryModel.findByPk(id)
			if (!category) {
				throw new NotFoundException('Category not found')
			}

			await this.categoryModel.update(updateCategoryDto, { where: { id } })
			const updatedCategory = await this.categoryModel.findByPk(id)

			if (!updatedCategory) {
				throw new Error('Failed to update category')
			}

			return successResponse(updatedCategory)
		} catch (error) {
			handleError(error)
		}
	}

	async remove(id: number) {
		try {
			const category = await this.categoryModel.findByPk(id)

			if (!category) {
				throw new NotFoundException('Category not found')
			}

			await this.categoryModel.destroy({ where: { id } })
			return successResponse({ message: 'Category deleted successfully' })
		} catch (error) {
			handleError(error)
		}
	}
}
