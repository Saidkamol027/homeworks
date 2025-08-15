import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/categries/entities/categry.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepo: Repository<Product>,
		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>
	) {}

	async create(createProductDto: CreateProductDto) {
		let category: Category | null = null

		if (createProductDto.categoriesId) {
			category = await this.categoryRepo.findOne({
				where: { id: createProductDto.categoriesId },
			})

			if (!category) {
				throw new NotFoundException('Category not found')
			}
		}

		const newProduct = this.productRepo.create({
			name: createProductDto.name,
			price: createProductDto.price,
			...(category && { category }),
		})

		return await this.productRepo.save(newProduct)
	}

	async findAll() {
		return await this.productRepo.find({
			relations: ['category', 'orderItem'],
		})
	}

	async findOne(id: number) {
		const product = await this.productRepo.findOne({
			where: { id },
			relations: ['category', 'orderItem'],
		})

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		return product
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		const product = await this.productRepo.findOne({ where: { id } })

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		let category: Category | null = null

		if (updateProductDto.categoriesId) {
			category = await this.categoryRepo.findOne({
				where: { id: updateProductDto.categoriesId },
			})

			if (!category) {
				throw new NotFoundException('Category not found')
			}
		}

		const updateData: any = {}
		if (updateProductDto.name) updateData.name = updateProductDto.name
		if (updateProductDto.price) updateData.price = updateProductDto.price
		if (category) updateData.category = category

		await this.productRepo.update(id, updateData)
		return await this.productRepo.findOne({
			where: { id },
			relations: ['category', 'orderItem'],
		})
	}

	async remove(id: number) {
		const product = await this.productRepo.findOne({ where: { id } })

		if (!product) {
			throw new NotFoundException('Product not found')
		}

		await this.productRepo.remove(product)
		return {}
	}
}
