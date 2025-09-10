import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import { Factory } from './entities/factory.entity'
import { FactoryController } from './factory.controller'
import { FactoryService } from './factory.service'

describe('FactoryController', () => {
	let controller: FactoryController

	const mockFactoryRepo = {
		create: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
		update: jest.fn(),
		destroy: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FactoryController],
			providers: [
				FactoryService,
				{
					provide: getModelToken(Factory),
					useValue: mockFactoryRepo,
				},
			],
		}).compile()

		controller = module.get<FactoryController>(FactoryController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
