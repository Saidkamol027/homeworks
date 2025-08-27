import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Category } from 'src/category/entities/category.entity'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Injectable()
export class CategoryService {
	constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

	create(data: CreateCategoryInput) {
		return this.categoryModel.create({ ...data } as Category)
	}

	findAll() {
		return this.categoryModel.findAll({ include: { all: true } })
	}

	findOne(id: number) {
		return this.categoryModel.findByPk(id, { include: { all: true } })
	}

	async update(data: UpdateCategoryInput) {
		const category = await this.findOne(data.id)
		if (!category) throw new Error('Category not found')
		return category.update(data)
	}

	async remove(id: number) {
		const category = await this.findOne(id)
		if (!category) throw new Error('Category not found')
		await category.destroy()
		return category
	}
}
