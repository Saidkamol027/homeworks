import { Test, TestingModule } from '@nestjs/testing'
import { EmployeController } from './employe.controller'
import { EmployeesService } from './employe.service'

describe('EmployeController', () => {
	let controller: EmployeController

	const mockEmployeService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmployeController],
			providers: [
				{
					provide: EmployeesService,
					useValue: mockEmployeService,
				},
			],
		}).compile()

		controller = module.get<EmployeController>(EmployeController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
