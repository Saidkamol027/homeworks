import { ConflictException, NotFoundException } from '@nestjs/common'
import { Employee } from '../employe/entities/employe.entity'
import { CreateFactoryDto } from './dto/create-factory.dto'
import { FactoryService } from './factory.service'

describe('FactoryService', () => {
	let service: FactoryService
	const mockFactoryModel = {
		findOne: jest.fn(),
		create: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
	}

	beforeEach(() => {
		service = new FactoryService(mockFactoryModel as any)
	})

	it('should create a factory', async () => {
		const dto: CreateFactoryDto = {
			name: 'Factory A',
			numberOfWorkers: 200,
		}

		mockFactoryModel.findOne.mockResolvedValue(null)
		mockFactoryModel.create.mockResolvedValue({ id: 1, ...dto })

		const result = await service.create(dto)
		expect(result).toEqual({ id: 1, ...dto })
		expect(mockFactoryModel.create).toHaveBeenCalledWith(dto)
	})

	it('should throw ConflictException if factory exists', async () => {
		const dto: CreateFactoryDto = { name: 'Factory A', numberOfWorkers: 200 }
		mockFactoryModel.findOne.mockResolvedValue({ id: 1, ...dto })

		await expect(service.create(dto)).rejects.toThrow(ConflictException)
	})

	it('should return all factories', async () => {
		const factories = [
			{ id: 1, name: 'Factory A', numberOfWorkers: 200, Employees: [] },
		]
		mockFactoryModel.findAll.mockResolvedValue(factories)

		const result = await service.findAll()
		expect(result).toEqual(factories)
		expect(mockFactoryModel.findAll).toHaveBeenCalledWith({
			include: [Employee],
		})
	})

	it('should return a factory by id', async () => {
		const factory = {
			id: 1,
			name: 'Factory A',
			numberOfWorkers: 200,
			Employees: [],
		}
		mockFactoryModel.findByPk.mockResolvedValue(factory)

		const result = await service.findOne(1)
		expect(result).toEqual(factory)
		expect(mockFactoryModel.findByPk).toHaveBeenCalledWith(1, {
			include: [Employee],
		})
	})

	it('should throw NotFoundException if factory not found', async () => {
		mockFactoryModel.findByPk.mockResolvedValue(null)
		await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
	})

	it('should update a factory', async () => {
		const dto = { name: 'Updated Factory', numberOfWorkers: 300 }
		const factory = {
			id: 1,
			name: 'Factory A',
			numberOfWorkers: 200,
			update: jest.fn().mockResolvedValue({ id: 1, ...dto }),
		}

		mockFactoryModel.findByPk.mockResolvedValue(factory)

		const result = await service.update(1, dto)
		expect(factory.update).toHaveBeenCalledWith(dto)
		expect(result).toEqual(factory)
	})

	it('should throw NotFoundException when updating non-existing factory', async () => {
		mockFactoryModel.findByPk.mockResolvedValue(null)
		await expect(
			service.update(1, { name: 'X', numberOfWorkers: 10 })
		).rejects.toThrow(NotFoundException)
	})

	it('should remove a factory', async () => {
		const factory = { id: 1, destroy: jest.fn() }
		mockFactoryModel.findByPk.mockResolvedValue(factory)

		await service.remove(1)
		expect(factory.destroy).toHaveBeenCalled()
	})

	it('should throw NotFoundException when removing non-existing factory', async () => {
		mockFactoryModel.findByPk.mockResolvedValue(null)
		await expect(service.remove(1)).rejects.toThrow(NotFoundException)
	})
})
