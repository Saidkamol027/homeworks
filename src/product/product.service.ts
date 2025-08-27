import { Product } from './entities/product.entity'
// src/product/product.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
	constructor(@InjectModel(Product) private productModel: typeof Product) {}

	create(data: CreateProductInput) {
		return this.productModel.create(data as any)
	}

	findAll() {
		return this.productModel.findAll({ include: { all: true } })
	}

	findOne(id: number) {
		return this.productModel.findByPk(id, { include: { all: true } })
	}

	async update(id: number, data: UpdateProductInput) {
		const product = await this.findOne(id)
		if (!product) {
			throw new Error('Product not found')
		}
		return product.update(data)
	}

	async remove(id: number) {
		const product = await this.findOne(id)
		if (!product) {
			throw new Error('Product not found')
		}
		await product.destroy()
		return product
	}
}
