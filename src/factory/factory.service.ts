import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Employee } from 'src/employe/entities/employe.entity'
import { CreateFactoryDto } from './dto/create-factory.dto'
import { UpdateFactoryDto } from './dto/update-factory.dto'
import { Factory } from './entities/factory.entity'

@Injectable()
export class FactoryService {
	constructor(@InjectModel(Factory) private readonly factory: typeof Factory) {}

	async create(createFactoryDto: CreateFactoryDto) {
		const founded = await this.factory.findOne({
			where: { name: createFactoryDto.name },
		})

		if (founded) {
			throw new ConflictException('This factory already exists')
		}

		return await this.factory.create({ ...createFactoryDto })
	}

	async findAll() {
		return await this.factory.findAll({ include: [Employee] })
	}

	async findOne(id: number) {
		const founded = await this.factory.findByPk(id, { include: [Employee] })

		if (!founded) {
			throw new NotFoundException('Factory not found')
		}

		return founded
	}

	async update(id: number, updateFactoryDto: UpdateFactoryDto) {
		const founded = await this.factory.findByPk(id)

		if (!founded) {
			throw new NotFoundException('Factory not found')
		}

		await founded.update(updateFactoryDto)

		return founded
	}

	async remove(id: number) {
		const factory = await this.factory.findByPk(id)

		if (!factory) {
			throw new NotFoundException('Factory not found')
		}

		await factory.destroy()
	}
}
