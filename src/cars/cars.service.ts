import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreationAttributes } from 'sequelize'
import { CreateCarDto } from './dto/create-car.dto'
import { Car } from './entities/car.entity'

@Injectable()
export class CarsService {
	constructor(
		@InjectModel(Car)
		private readonly carModel: typeof Car
	) {}

	async create(car: CreateCarDto) {
		// 👇 bu yerda casting qilamiz
		return this.carModel.create(car as CreationAttributes<Car>)
	}

	async findAll() {
		return this.carModel.findAll()
	}

	async findOne(id: number) {
		return this.carModel.findByPk(id)
	}

	async update(id: number, updateData: Partial<Car>) {
		await this.carModel.update(updateData, { where: { id } })
		return this.findOne(id)
	}

	async remove(id: number) {
		const deleted = await this.carModel.destroy({ where: { id } })
		return deleted > 0
			? { message: 'Deleted successfully' }
			: { message: 'Not found' }
	}
}
