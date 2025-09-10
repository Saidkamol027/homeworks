import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateEmployeeDto } from './dto/create-employe.dto'
import { UpdateEmployeDto } from './dto/update-employe.dto'
import { Employee } from './entities/employe.entity'

@Injectable()
export class EmployeesService {
	constructor(
		@InjectModel(Employee)
		private readonly employeeRepo: typeof Employee
	) {}

	async create(dto: CreateEmployeeDto) {
		return this.employeeRepo.create({ ...dto })
	}

	async findAll() {
		return this.employeeRepo.findAll({ include: { all: true } })
	}

	async findOne(id: number): Promise<Employee> {
		const employee = await this.employeeRepo.findByPk(id, {
			include: { all: true },
		})

		if (!employee) {
			throw new NotFoundException('Employee not found')
		}

		return employee
	}

	async update(id: number, dto: UpdateEmployeDto): Promise<Employee> {
		const employee = await this.employeeRepo.findByPk(id)

		if (!employee) {
			throw new NotFoundException('Employee not found')
		}

		await employee.update(dto)
		return employee
	}

	async remove(id: number): Promise<void> {
		const employee = await this.employeeRepo.findByPk(id)

		if (!employee) {
			throw new NotFoundException('Employee not found')
		}

		await employee.destroy()
	}
}
