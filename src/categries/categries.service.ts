import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCategryDto } from './dto/create-categry.dto'
import { UpdateCategryDto } from './dto/update-categry.dto'
import { Category } from './entities/categry.entity'

@Injectable()
export class CategriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>
	) {}

	async create(createCategryDto: CreateCategryDto) {
		const existingCategory = await this.categoryRepo.findOne({
			where: { name: createCategryDto.name },
		})

		if (existingCategory) {
			throw new ConflictException('Category with this name already exists')
		}

		const newCategory = this.categoryRepo.create(createCategryDto)
		return await this.categoryRepo.save(newCategory)
	}

	async findAll() {
		return await this.categoryRepo.find({ relations: ['products'] })
	}

	async findOne(id: number) {
		const category = await this.categoryRepo.findOne({
			where: { id },
			relations: ['products'],
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async update(id: number, updateCategryDto: UpdateCategryDto) {
		const category = await this.categoryRepo.findOne({ where: { id } })

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		if (updateCategryDto.name) {
			const existingCategory = await this.categoryRepo.findOne({
				where: { name: updateCategryDto.name },
			})

			if (existingCategory && existingCategory.id !== id) {
				throw new ConflictException('Category with this name already exists')
			}
		}

		await this.categoryRepo.update(id, updateCategryDto)
		return await this.categoryRepo.findOne({ where: { id } })
	}

	async remove(id: number) {
		const category = await this.categoryRepo.findOne({ where: { id } })

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		await this.categoryRepo.remove(category)
		return {}
	}
}
