import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateSaleInput } from './dto/create-sale.input'
import { UpdateSaleInput } from './dto/update-sale.input'
import { Sale } from './entities/sale.entity'

@Injectable()
export class SaleService {
	constructor(
		@InjectModel(Sale)
		private readonly saleModel: typeof Sale
	) {}

	create(data: CreateSaleInput) {
		return this.saleModel.create(data as any)
	}

	findAll() {
		return this.saleModel.findAll()
	}

	async update(id: number, data: UpdateSaleInput) {
		const sale = await this.saleModel.findByPk(id)
		if (!sale) throw new Error('Sale not found')
		return sale.update(data)
	}

	async remove(id: number) {
		const sale = await this.saleModel.findByPk(id)
		if (!sale) throw new Error('Sale not found')
		await sale.destroy()
		return true
	}
}
