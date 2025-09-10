import { NotFoundException } from '@nestjs/common'
import { CreateEmployeeDto } from './dto/create-employe.dto'
import { EmployeesService } from './employe.service'

describe('EmployeesService', () => {
	let service: EmployeesService
	const mockEmployeeModel = {
		create: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
	}	

	beforeEach(() => {
		service = new EmployeesService(mockEmployeeModel as any)
	})

	it('should create an employee', async () => {
		const dto: CreateEmployeeDto = {
			firstName: 'John',
			lastName: 'Doe',
			position: 'Engineer',
			salary: 500,
			factoryId: 1,
		}

		mockEmployeeModel.create.mockResolvedValue({ id: 1, ...dto })

		const result = await service.create(dto)
		expect(result).toEqual({ id: 1, ...dto })
		expect(mockEmployeeModel.create).toHaveBeenCalledWith(dto)
	})

	it('should return all employees', async () => {
		const employees = [
			{
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				position: 'Engineer',
				salary: 500,
				factoryId: 1,
			},
		]

		mockEmployeeModel.findAll.mockResolvedValue(employees)

		const result = await service.findAll()
		expect(result).toEqual(employees)
		expect(mockEmployeeModel.findAll).toHaveBeenCalledWith({
			include: { all: true },
		})
	})

	it('should return employee by id', async () => {
		const employee = {
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			position: 'Engineer',
			salary: 500,
			factoryId: 1,
		}

		mockEmployeeModel.findByPk.mockResolvedValue(employee)

		const result = await service.findOne(1)
		expect(result).toEqual(employee)
		expect(mockEmployeeModel.findByPk).toHaveBeenCalledWith(1, {
			include: { all: true },
		})
	})

	it('should throw NotFoundException if employee not found', async () => {
		mockEmployeeModel.findByPk.mockResolvedValue(null)
		await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
	})

	it('should update an employee', async () => {
		const dto = { position: 'Manager', salary: 700 }
		const employee = {
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			position: 'Engineer',
			salary: 500,
			factoryId: 1,
			update: jest.fn().mockResolvedValue({ id: 1, ...dto }),
		}

		mockEmployeeModel.findByPk.mockResolvedValue(employee)

		const result = await service.update(1, dto)
		expect(employee.update).toHaveBeenCalledWith(dto)
		expect(result).toEqual(employee)
	})

	it('should throw NotFoundException when updating non-existing employee', async () => {
		mockEmployeeModel.findByPk.mockResolvedValue(null)
		await expect(
			service.update(1, { position: 'X', salary: 0 })
		).rejects.toThrow(NotFoundException)
	})

	it('should remove an employee', async () => {
		const employee = { id: 1, destroy: jest.fn() }
		mockEmployeeModel.findByPk.mockResolvedValue(employee)

		await service.remove(1)
		expect(employee.destroy).toHaveBeenCalled()
	})

	it('should throw NotFoundException when removing non-existing employee', async () => {
		mockEmployeeModel.findByPk.mockResolvedValue(null)
		await expect(service.remove(1)).rejects.toThrow(NotFoundException)
	})
})
