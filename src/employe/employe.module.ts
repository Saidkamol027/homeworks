import { Module } from '@nestjs/common'
import { EmployeController } from './employe.controller'
import { EmployeesService } from './employe.service'

@Module({
	controllers: [EmployeController],
	providers: [EmployeesService],
})
export class EmployeModule {}
